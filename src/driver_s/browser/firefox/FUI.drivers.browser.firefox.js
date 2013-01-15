FUI.drivers.browser.firefox = new FUI.driver.browser();
	
FUI.drivers.browser.firefox.data = {};
		
FUI.drivers.browser.firefox.mouse = function ( event ) {
	var data = FUI.driver.browser.prototype.mouse( event );
	
	data.pointers.mouse.dz = data.pointers.mouse.dz || 0;
	if( event.type == "DOMMouseScroll" ) {
		data.pointers.mouse.dz = -1 * Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
	}
	
	/* // while Firefox has the superior standard, the implementation is buggy: (v18) holding down middle & releasing (up) left still results in 5 (1||4)
	data.pointers.mouse.buttons = {};
	data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_LEFT ]   = (event.buttons &  1) ? true : false;
	data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_RIGHT ]  = (event.buttons &  2) ? true : false;
	data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_MIDDLE ] = (event.buttons &  4) ? true : false;
	data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_AUX_A ]  = (event.buttons &  8) ? true : false;
	data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_AUX_B ]  = (event.buttons & 16) ? true : false;
	// but if an mouseup event, these are which were UP, not down!! :S see https://developer.mozilla.org/en-US/docs/DOM/MouseEvent
	if( event.type == "mouseup" ) {
		data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_LEFT ]   = ! data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_LEFT ];
		data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_RIGHT ]  = ! data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_RIGHT ];
		data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_MIDDLE ] = ! data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_MIDDLE ];
		data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_AUX_A ]  = ! data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_AUX_A ];
		data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_AUX_B ]  = ! data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_AUX_B ];
	}
	DEBUG && FUI.debug.log( 10, ["firefox.mouse, left", data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_LEFT ], "middle", data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_MIDDLE ] ] );
	//*/
	
	if ( event.mozInputSource ) {
		if ( event.mozInputSource == event.MOZ_SOURCE_MOUSE ) {
			data.pointers.mouse.source = FUI.POINTER_SOURCE_MOUSE;
		} else if ( event.mozInputSource == event.MOZ_SOURCE_PEN ) {
			data.pointers.mouse.source = FUI.POINTER_SOURCE_PEN;
		} else if ( event.mozInputSource == event.MOZ_SOURCE_ERASER ) {
			data.pointers.mouse.source = FUI.POINTER_SOURCE_ERASER;
		} else if ( event.mozInputSource == event.MOZ_SOURCE_CURSOR ) {
			data.pointers.mouse.source = FUI.POINTER_SOURCE_CURSOR;
		} else if ( event.mozInputSource == event.MOZ_SOURCE_TOUCH ) {
			data.pointers.mouse.source = FUI.POINTER_SOURCE_TOUCH;
		} else if ( event.mozInputSource == event.MOZ_SOURCE_KEYBOARD ) {
			data.pointers.mouse.source = FUI.POINTER_SOURCE_KEYBOARD;
		} else if ( event.mozInputSource == event.MOZ_SOURCE_UNKNOWN ) {
			data.pointers.mouse.source = FUI.POINTER_SOURCE_UNKNOWN;
		} else {
			data.pointers.mouse.source = FUI.POINTER_SOURCE_UNKNOWN;
		}
	}
	
	if ( event.mozPressure !== undefined ){
		data.pointers.mouse.pressure = event.mozPressure;
	}	
	
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