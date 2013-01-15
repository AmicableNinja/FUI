FUI.driver.browser = function () {};
FUI.driver.browser.prototype = {
	constructor : FUI.driver.browser,
	mouse : function () {},
	keyboard : function () {},
	touches : function () {}
};

FUI.driver.browser.prototype.mouse = function ( event ) {
	var data = {};
	
	data.timestamp = event.timestamp || Date.now();
	
	data.pointers = {};
	data.pointers.mouse = {
		x : event.clientX, // options: clientX, pageX, layerX
		y : event.clientY
	};
	
	data[ FUI.BUTTON_CONTROL ] = event.ctrlKey;
	data[ FUI.BUTTON_ALT ]     = event.altKey;
	data[ FUI.BUTTON_SHIFT ]   = event.shiftKey;
	data[ FUI.BUTTON_META ]    = event.metaKey;
	
	data.pointers.mouse.buttons = {};
	if (event.type == 'mouseup' || event.type == 'mousedown') {
		var upDown = event.type == 'mouseup' ? false : true;
		var button = event.button;
		if ( button == undefined ){ button = event.which - 1; }
		switch (button) {
			case 0: //left
				data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_LEFT ]   = upDown;
				break;
			case 1: //middle
				data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_MIDDLE ] = upDown;
				break;
			case 2: //right
				data.pointers.mouse.buttons[ FUI.BUTTON_POINTER_RIGHT ]  = upDown;
				break;
			default:
				FUI.debug.error( 10, ["incorrect button (0,1,2||3):", button, event.button, event.which] );
				break;
		}
		DEBUG && FUI.debug.log( 2, [ "setting data.pointers.mouse.buttons", data.pointers.mouse.buttons ]);
	}
	
	//TODO more data
	
	return data;
};

FUI.driver.browser.prototype.keyboard = function ( event ) {
	event = event || {};
	var physicalButtonValue = event.keyCode || event.which;
	var buttonConstVal = null;
	if( FUI.driver.keyboard.prototype.buttonTable[physicalButtonValue] ){
		buttonConstVal = FUI.driver.keyboard.prototype.buttonTable[physicalButtonValue];
	}else{
		buttonConstVal = physicalButtonValue;
	}
	if(buttonConstVal[0])
		buttonConstVal = buttonConstVal[0];
	
	return {
		buttonCode   : buttonConstVal,
		timestamp    : event.timestamp || event.timeStamp,
		rawEventData : event
	};
};

FUI.driver.browser.prototype.keyboard_postProcess = function (data){
	
	// this is to run after the specific driver function
	if ( ! data.location ) {
		var location = FUI.MASK_LOCATION & data.buttonCode;
		if( location ){ data.location = location; }
	}
	
	data.buttonHash = data.buttonCode | (data.location  || 0x0);
	
	return data;
};

FUI.drivers.browser.defaultDriver = new FUI.driver.browser();

//TODO build default keyboard