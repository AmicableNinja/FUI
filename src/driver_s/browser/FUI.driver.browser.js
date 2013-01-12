FUI.driver.browser = function () {};
FUI.driver.browser.prototype = {
	constructor : FUI.driver.browser,
	mouse : function () {},
	keyboard : function () {},
	touches : function () {}
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