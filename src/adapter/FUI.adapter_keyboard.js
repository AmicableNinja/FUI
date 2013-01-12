FUI.adapter_keyboard = function () {
	
	this.buttons = {};
	//TODO
};

FUI.adapter_keyboard.prototype.getButtons = function () {
	return this.buttons;
};

FUI.adapter_keyboard.prototype.down = function ( button ) {
	return this.buttons[ button ] = Date.now();
};

FUI.adapter_keyboard.prototype.up = function ( button ) {
	delete this.buttons[ button ];
};



// button or pointer
FUI.fui = function (type, which, events, location, source) {
	
	this.which = which || 0x0;
	
	this.type = type || 0x0; // button or pointer
	
	this.events = events || [];
	
	this.location = location || 0x0;
	
	this.source = source || 0x0;
	
};

FUI.fui.prototype.evaluateFromState = function (stateData) {
	FUI.debug.error( 10, ["not implemented yet (evaluateFromState)", this] );
	return false;
};

FUI.fui.prototype.evaluate = function (data) {
	return this.evaluateFromState( data );
};

var fui_button_O = new FUI.fui( FUI.TYPE_BUTTON, FUI.BUTTON_O, [FUI.EVENT_DOWN, FUI.EVENT_STILL_DOWN] );
var fui_button_6_all = new FUI.fui( FUI.TYPE_BUTTON, FUI.BUTTON_6, [FUI.EVENT_DOWN, FUI.EVENT_STILL_DOWN], FUI.BUTTON_LOCATION_ALL );
var fui_button_3_numpad = new FUI.fui( FUI.TYPE_BUTTON, FUI.BUTTON_3, [FUI.EVENT_DOWN, FUI.EVENT_STILL_DOWN], FUI.BUTTON_LOCATION_NUMPAD );

var fui_sbool = new FUI.sbool( [ fui_button_O, fui_button_6_all, fui_button_3_numpad ] );