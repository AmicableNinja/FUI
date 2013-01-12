FUI.drivers.browser.firefox = new FUI.driver.browser();
	
FUI.drivers.browser.firefox.data = {};
		
FUI.drivers.browser.firefox.mouse = function ( event ) {
	
	var data = {};
	data.extras = {};
	data.extras.timestamp = Date.now();
	

	data.pointer = {
		x : event.clientX, // options: clientX, pageX, layerX
		y : event.clientY
	};
	if( event.type == "DOMMouseScroll" ) {
		data.pointer.dz = -1 * Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
	}
	
	data.buttons = {};
	data.buttons.left	= (event.buttons &  1) ? true : false;
	data.buttons.right	= (event.buttons &  2) ? true : false;
	data.buttons.middle	= (event.buttons &  4) ? true : false;
	data.buttons.auxA	= (event.buttons &  8) ? true : false;
	data.buttons.auxB	= (event.buttons & 16) ? true : false;
	
	
	//data.extras = {};
	
	data.extras.keyboard = {
		ctrl  : event.ctrlKey,
		alt   : event.altKey,
		shift : event.shiftKey,
		meta  : event.metaKey
	};
	
	if ( event.mozInputSource ) {
		if ( event.mozInputSource == event.MOZ_SOURCE_MOUSE ) {
			data.extras.source = FUI.POINTER_SOURCE_MOUSE;
		} else if ( event.mozInputSource == event.MOZ_SOURCE_PEN ) {
			data.extras.source = FUI.POINTER_SOURCE_PEN;
		} else if ( event.mozInputSource == event.MOZ_SOURCE_ERASER ) {
			data.extras.source = FUI.POINTER_SOURCE_ERASER;
		} else if ( event.mozInputSource == event.MOZ_SOURCE_CURSOR ) {
			data.extras.source = FUI.POINTER_SOURCE_CURSOR;
		} else if ( event.mozInputSource == event.MOZ_SOURCE_TOUCH ) {
			data.extras.source = FUI.POINTER_SOURCE_TOUCH;
		} else if ( event.mozInputSource == event.MOZ_SOURCE_KEYBOARD ) {
			data.extras.source = FUI.POINTER_SOURCE_KEYBOARD;
		} else if ( event.mozInputSource == event.MOZ_SOURCE_UNKNOWN ) {
			data.extras.source = FUI.POINTER_SOURCE_UNKNOWN;
		} else {
			data.extras.source = FUI.POINTER_SOURCE_UNKNOWN;
		}
	}
	
	if ( event.mozPressure !== undefined ){
		data.extras.pressure = event.mozPressure;
	}
	
	data.extras.timestamp = event.timestamp || data.extras.timestamp;
	
	
	return data;
};

FUI.drivers.browser.firefox.keyboard = function ( event ) {
	var data = FUI.driver.browser.prototype.keyboard( event );
	
	if( event.location !== undefined ){
		if ( event.location == event.DOM_KEY_LOCATION_STANDARD )       { data.location = FUI.BUTTON_LOCATION_STANDARD; }
		else if ( event.location == event.DOM_KEY_LOCATION_NUMPAD )   { data.location = FUI.BUTTON_LOCATION_NUMPAD; }
		else if ( event.location == event.DOM_KEY_LOCATION_MOBILE )   { data.location = FUI.BUTTON_LOCATION_MOBILE; }
		else if ( event.location == event.DOM_KEY_LOCATION_LEFT )     { data.location = FUI.BUTTON_LOCATION_LEFT; }
		else if ( event.location == event.DOM_KEY_LOCATION_RIGHT )    { data.location = FUI.BUTTON_LOCATION_RIGHT; }
		else if ( event.location == event.DOM_KEY_LOCATION_JOYSTICK ) { data.location = FUI.BUTTON_LOCATION_JOYSTICK; }
		// else well...we really don't know :(
	}
	
	//TODO use DOM_VK_'s
	
	
	
	return data;
};

FUI.drivers.browser.firefox.touches = function ( event ) {
	return {	
		// TODO touch portion of driver
		rawData : event
	};
};

FUI.drivers.browser.defaultDriver = FUI.drivers.browser.firefox;