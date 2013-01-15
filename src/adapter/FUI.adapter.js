FUI.adapter = function () {
	
	this.options = {
		"disableContextMenu"	: true,
		"moveTimer"				: 250
	};
	
	this.state = {
		pointers : null,
		buttons  : null
	};
	
	
	this.__driver = null;
	
	this.__events = [];
	this.__lastButtonDown = {};
	
	//TODO
};

FUI.adapter.prototype.listenOn = function(desiredElement){
	DEBUG && FUI.debug.log( 1, ["listenOn", desiredElement] );
	this.listeningElement = desiredElement || document;
	
	this.options  = this.options  || {};
	this.__driver = this.__driver || FUI.drivers.defaultDriver;
	
	this.state.pointers = this.state.pointers || {};
	this.state.buttons  = this.state.buttons  || {};
	
	// retain scope
	var that = this;
	
	this.listeningElement.addEventListener( 'mousedown', function(event){that.__listener_mouse_down(event);}, false );
	this.listeningElement.addEventListener( 'mouseup',   function(event){that.__listener_mouse_up(event);}, false );
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
		DEBUG && FUI.debug.log( 10, ["is instanceof", driver, FUI.driver.browser] );
	} else if ( driver && FUI.drivers[driver] ) {
		this.__driver = FUI.drivers[driver];
	} else {
		FUI.debug.error( 10, ["driver not recognized: ", driver] );
	}
	
	return this;
};

FUI.adapter.prototype.listenFor = function ( gesture, callbackFunction ) {
	
	// TODO re-enable
	/*
	if ( ! gesture || ! callbackFunction ) {
		FUI.debug.error( 10, ["invalid gesture or callbackFunction", gesture, callbackFunction] );
		return this;
	} else if ( ! (gesture instanceof FUI.gesture) || ( "function" != typeof callbackFunction) ) {
		FUI.debug.error( 10, ["incorrect gesture or callbackFunction", [gesture, (gesture instanceof FUI.gesture)], [callbackFunction, ("function" != typeof callbackFunction)]] );
		return this;
	}//*/
	
	this.__events.push({
		gesture  : gesture,
		callback : callbackFunction
	});
	
	DEBUG && FUI.debug.log( 3, ["added gesture to stack", this.__events.length, this.__events] );
	
	return this;
};

// TODO orphaned? marked for removal
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
	this.__lastButtonDown[ data.buttonCode ] = false;
	DEBUG && FUI.debug.log( 2, ["listener_button_up fired", data, event ] );
	this.updateState_buttons( data, false );
	this.gestureCheck();
	//TODO
};

FUI.adapter.prototype.__listener_key_down = function(event){
	var data = this.__listener_driver( event, "keyboard" );
	
	if ( true == this.__lastButtonDown[ data.buttonCode ] ) {
		//DEBUG && FUI.debug.log( 1, ["listener_button_down rep. fired, ", data, event] );
	} else {
		data = FUI.driver.browser.prototype.keyboard_postProcess(data);
		DEBUG && FUI.debug.log( 2, ["listener_button_down fired, ", data, event] );
		this.updateState_buttons( data, true );
		this.gestureCheck();
		this.__lastButtonDown[ data.buttonCode ] = true;
	}
	//TODO
};


FUI.adapter.prototype.__listener_mouse_down = function(event){
	DEBUG && FUI.debug.log( 2, ["listener_mouse_down fired, ", event] );
	var data = this.__listener_driver( event, "mouse" );
	this.updateState_pointers( data, true );
	this.gestureCheck();
	//TODO fire events?
};

FUI.adapter.prototype.__listener_mouse_up = function(event){
	DEBUG && FUI.debug.log( 2, ["listener_mouse_up fired, ", event] );
	var data = this.__listener_driver( event, "mouse" );
	this.updateState_pointers( data, true );
	this.gestureCheck();
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
	
	DEBUG && FUI.debug.log( 2, ["listener_mouse_move_fire fired, ", event] );
	this.updateState_pointers( data, true );
	this.gestureCheck();
	//TODO
	
	this.lastMoveSync = data;
};

FUI.adapter.prototype.__listener_mouse_scroll = function ( event ) {
	DEBUG && FUI.debug.log( 2, ["listener_mouse_scroll fired, ", event] );
	var data = this.__listener_driver( event, "mouse" );
	//TODO
	
	
	//TODO listener_mouse_scroll needs to be formalized, Firefox exposes a lot of source types
	
	// cross-browser wheel delta, from http://www.sitepoint.com/html5-javascript-mouse-wheel/
	//var e = window.event || event; // old IE support
	//e.delta = -1 * Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	
	//DEBUG && FUI.debug.log( 1, ["scrolled!", e, e.delta, (e.wheelDelta || -e.detail)] );
	//DEBUG && FUI.debug.log( 1, [this.lastScroll = this.__listener_driver( event, "mouse" )] );
	
	// this is temporary, just to allow basic 3rd axis navigation
	//this.__pointerEvent("scroll", "all", e);
	
	this.updateState_pointers( data, true );
	this.gestureCheck();
};

FUI.adapter.prototype.__listener_driver = function (event, deviceType) {
	
	//event.timestamp = event.timestamp || Date.now();
	
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

FUI.adapter.prototype.updateState_pointers = function ( data, isMouse ) {
	DEBUG && FUI.debug.log( 2, [ "updateState_pointers", data ] );
	
	this.state.pointers.lastUpdate = data.timestamp;
	
	//this.state.pointers.mouse = this.state.pointers.mouse || isMouse;
	var ref = null;
	if ( isMouse ) {
		ref = ( this.state.pointers["mouse"] = this.state.pointers.mouse || {} );
	}else{
		ref = this.state.pointers[ data.identifier ];
	}
	
	for( var n in data.pointers ) {
		var curPnt = data.pointers[ n ];
		if ( curPnt.dz ) { ref.z += curPnt.dz; }
	
		if ( curPnt.x  ) { ref.x  = curPnt.x;  }
		if ( curPnt.y  ) { ref.y  = curPnt.y;  }
		if ( curPnt.z  ) { ref.z  = curPnt.z;  }
		
		for (var n in curPnt.buttons){
			DEBUG && FUI.debug.log( 1, ["n & FUI.MASK_BUTTON_POINTER) == FUI.MASK_BUTTON_POINTER", (n+" & "+FUI.MASK_BUTTON_POINTER+") == "+FUI.MASK_BUTTON_POINTER), ((n & FUI.MASK_BUTTON_POINTER) == FUI.MASK_BUTTON_POINTER)]);
			if ( (n & FUI.MASK_BUTTON_POINTER) == FUI.MASK_BUTTON_POINTER ) {
				ref[n] = curPnt.buttons[n];
			}else{
				this.state.buttons[n] = curPnt.buttons[n];
			}
		}
	}
	
	if ( data[ FUI.BUTTON_CONTROL ] != undefined ) { this.state.buttons[ FUI.BUTTON_CONTROL ] =  { down: data[ FUI.BUTTON_CONTROL ], timestamp: data.timestamp }; }
	if ( data[ FUI.BUTTON_ALT ]     != undefined ) { this.state.buttons[ FUI.BUTTON_ALT ]     =  { down: data[ FUI.BUTTON_ALT ]    , timestamp: data.timestamp }; }
	if ( data[ FUI.BUTTON_SHIFT ]   != undefined ) { this.state.buttons[ FUI.BUTTON_SHIFT ]   =  { down: data[ FUI.BUTTON_SHIFT ]  , timestamp: data.timestamp }; }
	if ( data[ FUI.BUTTON_META ]    != undefined ) { this.state.buttons[ FUI.BUTTON_META ]    =  { down: data[ FUI.BUTTON_META ]   , timestamp: data.timestamp }; }
	
	//TODO
};

FUI.adapter.prototype.updateState_buttons = function ( data, buttonDown ) {
	DEBUG && FUI.debug.log( 2, [ "updateState_buttons", data ] );
	
	this.state.buttons.lastUpdate = data.timestamp;
	
	this.state.buttons[ data.buttonCode ] = {
		down      : buttonDown,
		timestamp : data.timestamp,
		location  : data.location
	};
	
	DEBUG && FUI.debug.log( 1, [ "updateState_buttons", data, this.state.buttons ] );
	//TODO
};

FUI.adapter.prototype.gestureCheck = function () {
	//TODO
	DEBUG && FUI.debug.log( 10, [ "gestureCheck", this.__events, this.state ] );
	for (var n in this.__events) {
		if( this.__events[n].gesture.evaluate ) {
			if( this.__events[n].gesture.evaluate(this.state) ) {
				var res = this.__events[n].callback();
				DEBUG && FUI.debug.log( 8, [n, "callback res", res] );
			}
		}else{
			FUI.debug.error( 10, ["unknown gesture type", this.__events[n].gesture] );
		}
	}
};