FUI.adapter = function () {
	
	this.options = {
		"disableContextMenu"	: true,
		"moveTimer"				: 250
	};
	
	this.state = {
		mouse    : null,
		keyboard : null,
		touches  : null
	};
	
	
	this.__driver = null;
	
	this.__events = [];
	
	//TODO
};

FUI.adapter.prototype.listenOn = function(desiredElement){
	FUI.debug.log( 1, ["listenOn", desiredElement] );
	this.listeningElement = desiredElement || document;
	
	this.options  = this.options  || {};
	this.__driver = this.__driver || FUI.drivers.defaultDriver;
	
	this.state.mouse    = this.state.mouse    || new FUI.adapter_mouse();
	this.state.keyboard = this.state.keyboard || new FUI.adapter_keyboard();
	this.state.touches  = this.state.touches  || new FUI.adapter_touches();
	
	// retain scope
	var that = this;
	
	//this.listeningElement.addEventListener( 'mousedown', function(event){that.__listener_mouse_down(event);}, false );
	//this.listeningElement.addEventListener( 'mouseup',   function(event){that.__listener_mouse_up(event);}, false );
	//this.listeningElement.addEventListener( 'mousemove', function(event){that.__listener_mouse_move(event);}, false );
	
	this.listeningElement.addEventListener( 'mousewheel',     function(event){that.__listener_mouse_scroll(event);}, false );
	this.listeningElement.addEventListener( 'DOMMouseScroll', function(event){that.__listener_mouse_scroll(event);}, false );
	
	//TODO determine if document is needed, or if there's a way to get events to fire when its desiredElement
	document.addEventListener( 'keydown',  function(event){that.__listener_key_down(event);},  false );
	document.addEventListener( 'keyup',    function(event){that.__listener_key_up(event);},    false );
	// for keypress, see http://www.quirksmode.org/dom/events/keys.html 
	
	this.options.disableContextMenu = this.options.disableContextMenu || false;
	if( this.options.disableContextMenu ){
		document.oncontextmenu = function(e){
			if (e && e.stopPropagation)
				e.stopPropagation();
			return false;
		};
	}
	
	// schedule the mousemove
	this.options.moveTimer = this.options.moveTimer || 250;
	//this.__mousemoveTimer = setInterval(function(){that.listener_mouse_move_fire();}, this.options.moveTimer);
	//TODO enable changing the interval
	
	return this;
};

FUI.adapter.prototype.listenUsing = function (driver) {
	if (driver instanceof FUI.driver.browser.prototype.constructor) {
		this.__driver = driver;
		FUI.debug.log( 10, ["is instanceof", driver, FUI.driver.browser] );
	} else if ( driver && FUI.drivers[driver] ) {
		this.__driver = FUI.drivers[driver];
	} else {
		FUI.debug.error( 10, ["driver not recognized: ", driver] );
	}
	
	return this;
};

FUI.adapter.prototype.listenFor = function ( gesture, callbackFunction ) {
	
	if ( ! gesture || ! callbackFunction ) {
		FUI.debug.error( 10, ["invalid gesture or callbackFunction", gesture, callbackFunction] );
		return this;
	} else if ( ! (gesture instanceof FUI.gesture) || ( "function" != typeof callbackFunction) ) {
		FUI.debug.error( 10, ["incorrect gesture or callbackFunction", [gesture, (gesture instanceof FUI.gesture)], [callbackFunction, ("function" != typeof callbackFunction)]] );
		return this;
	}
	
	this.__events.push({
		gesture  : gesture,
		callback : callbackFunction
	});
	
	FUI.debug.log( 3, ["added gesture to stack", this.__events.length, this.__events] );
	
	return this;
};


FUI.adapter.prototype.__sendState = function (rawEventDataInput) {
	
	var mouse = this.state.mouse;
	var keyboard = this.state.keyboard;
	var touches = this.state.touches;

	return {
		pointers : [ mouse.getPointer() ].concat( touches.getPointers() ),
		buttons  : keyboard.getButtons(),
		hardware : {
			mouse    : mouse,
			keyboard : keyboard,
			touches  : touches
		},
		rawEventData : rawEventDataInput
	};
};

//** listeners **//

FUI.adapter.prototype.__listener_key_up = function(event){
	var data = this.__listener_driver( event, "keyboard" );
	data = FUI.driver.browser.prototype.keyboard_postProcess(data);
	FUI.debug.log( 1, ["listener_button_up fired", data, event ] );
	//TODO
};

FUI.adapter.prototype.__listener_key_down = function(event){
	var data = this.__listener_driver( event, "keyboard" );
	data = FUI.driver.browser.prototype.keyboard_postProcess(data);
	FUI.debug.log( 1, ["listener_button_down fired, ", data, event] );
	//TODO
};


FUI.adapter.prototype.__listener_mouse_down = function(event){
	FUI.debug.log( 1, ["listener_mouse_down fired, ", event] );
	var data = this.__listener_driver( event, "mouse" );
	this.state.mouse.fromData( data );
	FUI.debug.log( 1, ["this.state.mouse", this.state.mouse] );
	//TODO fire events?
};

FUI.adapter.prototype.__listener_mouse_up = function(event){
	FUI.debug.log( 1, ["listener_mouse_up fired, ", event] );
	var data = this.__listener_driver( event, "mouse" );
	this.state.mouse.fromData( data );
	FUI.debug.log( 1, ["this.state.mouse", this.state.mouse] );
	//TODO
};

FUI.adapter.prototype.__listener_mouse_move = function(event){
	this.lastMoveAsync = this.__listener_driver( event, "mouse" );
};

FUI.adapter.prototype.__listener_mouse_move_fire = function(event){
	var data = this.lastMoveAsync;
	if( data == this.lastMoveSync ){
		return false;
	}
	this.state.mouse.fromData( data );
	
	FUI.debug.log( 1, ["listener_mouse_move_fire fired, ", event] );
	//TODO
	
	this.lastMoveSync = data;
};

FUI.adapter.prototype.__listener_mouse_scroll = function ( event ) {
	FUI.debug.log( 1, ["listener_mouse_scroll fired, ", event] );
	var data = this.__listener_driver( event, "mouse" );
	this.state.mouse.fromData( data );
	FUI.debug.log( 1, ["this.state.mouse", this.state.mouse] );
	//TODO
	
	
	//TODO listener_mouse_scroll needs to be formalized, Firefox exposes a lot of source types
	
	// cross-browser wheel delta, from http://www.sitepoint.com/html5-javascript-mouse-wheel/
	//var e = window.event || event; // old IE support
	//e.delta = -1 * Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	
	//FUI.debug.log( 1, ["scrolled!", e, e.delta, (e.wheelDelta || -e.detail)] );
	//FUI.debug.log( 1, [this.lastScroll = this.__listener_driver( event, "mouse" )] );
	
	// this is temporary, just to allow basic 3rd axis navigation
	//this.__pointerEvent("scroll", "all", e);
};

FUI.adapter.prototype.__listener_driver = function (event, deviceType) {
	
	if ( this.__driver ) {
		if ( ! deviceType || ! this.__driver [deviceType] ) {
			FUI.debug.error( 10, ["incorrect deviceType specified:", deviceType ]);
			return false;
		}
		return this.__driver[ deviceType ]( event );
	} else {
		FUI.debug.error( 10, ["Driver " + this.__driver + " not installed!", this.__driverList] );
	}
	
	return false;
};