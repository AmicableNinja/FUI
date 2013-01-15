// ---------- ../src/FUI.js ---------- //
/**
 * @author AmicableNinja / https://github.com/AmicableNinja/
 */

var FUI = FUI || { revision : 1 };

// CONSTANTS

//TODO marked for removal
FUI.TYPE_POINTER                    = 0x1;
FUI.TYPE_BUTTON                     = 0x2;

FUI.EVENT_UP                  =    0x1;
FUI.EVENT_DOWN                =    0x2;
FUI.EVENT_STILL_DOWN          =    0x4; // only valid for buttons, repetitive fire
FUI.EVENT_MOVE                =    0x8; // only valid for pointers 
// TODO remove EVENT_DOWN_ALREADY???
FUI.EVENT_DOWN_ALREADY        =    FUI.EVENT_STILL_DOWN;

// TODO use bitwise? performance vs. OOP? support both? *wincing*

//Javascript has 8 hex digit precision //
FUI.MASK_ALL                      = 0xFFFFFFFF;
FUI.MASK_BUTTON                   = 0x0001FFFF; // to allow all 4 byte UTF-8 chars (even those not specified by constants) and an extended range
FUI.MASK_BUTTON_EXTENDED          = 0x00010000;
FUI.MASK_BUTTON_POINTER           = 0x0001F000;
FUI.MASK_LOCATION                 = 0x000E0000;
FUI.MASK_SOURCE                   = 0x00F00000;
FUI.MASK_EVENT                    = 0x0F000000;
// TODO top block to be open for events?

FUI.POINTER_SOURCE_MOUSE          =   0x100000;
FUI.POINTER_SOURCE_PEN            =   0x200000;
FUI.POINTER_SOURCE_ERASER         =   0x300000;
FUI.POINTER_SOURCE_CURSOR         =   0x400000;
FUI.POINTER_SOURCE_TOUCH          =   0x500000;
FUI.POINTER_SOURCE_KEYBOARD       =   0x600000;
FUI.POINTER_SOURCE_UNKNOWN        =   0x700000;

// 0, 2, 4, 6, 8, 10, 12, 14
FUI.BUTTON_LOCATION_ALL           =    0x00000;
FUI.BUTTON_LOCATION_STANDARD      =    0x20000;
FUI.BUTTON_LOCATION_LEFT          =    0x40000;
FUI.BUTTON_LOCATION_RIGHT         =    0x60000;
FUI.BUTTON_LOCATION_NUMPAD        =    0x80000;
FUI.BUTTON_LOCATION_MOBILE        =    0xA0000;
FUI.BUTTON_LOCATION_JOYSTICK      =    0xE0000;

//** Based on Unicode values **//
// Thses values are NOT exclusive to each button, ex: US keyboards have ! and 1 on the same button, using the SHIFT modifier
// browsers only report the key, not the symbol, so relying on these to be exclusive is (currently) incorrect
// TODO allow character listening? Preliminary: No, even Chrome (which reports keyIdentifier in form U+0031) does not differentiate the character based on modifier keys
// Controls, not on keybds 0x0000 - 0x0007
FUI.BUTTON_BACKSPACE              =     0x0008;  // There is an important distinction between Backspace and Delete in keyboards, C0, C1, and UTF namespaces.
                                               // While UTF names are used to avoid confusion on the application level, the UTF values are NOT the same as in the others
                                               // see the notes in the driver section and http://en.wikipedia.org/wiki/Delete_character
FUI.BUTTON_TAB                    =     0x0009;  // CHAR. TABULATION
FUI.BUTTON_ENTER                  =     0x000D;  // CARRIAGE RETURN (CR)
FUI.BUTTON_SHIFT                  =     0x000F;  // SHIFT_IN
FUI.BUTTON_CONTROL                =     0x0011;  // DEVICE CONTROL ONE
FUI.BUTTON_ALT                    =     0x0012;  // DEVICE CONTROL TWO
FUI.BUTTON_ESCAPE                 =     0x001B;  // ESCAPE 
FUI.BUTTON_SPACE                  =     0x0020;  // SPACE
// EXCLAMATION MARK                         21
// QUOTATION MARK                           22
// NUMBER SIGN                              23
// DOLLAR SIGN                              24
// PERCENT SIGN                             25
// AMPERSAND                                26
FUI.BUTTON_APOSTROPHE             =     0x0027;
// LEFT PARENTHESIS                         28
// RIGHT PARENTHESIS                        29
FUI.BUTTON_ASTERISK               =     0x002A; // on NUMPAD
FUI.BUTTON_PLUS_SIGN              =     0x002B; // on NUMPAD
FUI.BUTTON_COMMA                  =     0x002C;
FUI.BUTTON_HYPHEN_MINUS           =     0x002D; // HYPHEN-MINUS but use an underscore instead
FUI.BUTTON_FULL_STOP              =     0x002E; // Period
  FUI.BUTTON_PERIOD = FUI.BUTTON_FULL_STOP; //TODO allow common, but non-UTF names?
FUI.BUTTON_SOLIDUS                =     0x002F;
  FUI.BUTTON_SLASH = FUI.BUTTON_FORWARD_SLASH = FUI.BUTTON_SOLIDUS; //TODO allow common, but non-UTF names?
  
FUI.BUTTON_DIGIT_ZERO             =     0x0030;
FUI.BUTTON_DIGIT_ONE              =     0x0031;
FUI.BUTTON_DIGIT_TWO              =     0x0032;
FUI.BUTTON_DIGIT_THREE            =     0x0033;
FUI.BUTTON_DIGIT_FOUR             =     0x0034;
FUI.BUTTON_DIGIT_FIVE             =     0x0035;
FUI.BUTTON_DIGIT_SIX              =     0x0036;
FUI.BUTTON_DIGIT_SEVEN            =     0x0037;
FUI.BUTTON_DIGIT_EIGHT            =     0x0038;
FUI.BUTTON_DIGIT_NINE             =     0x0039;
//TODO allow common, but non-UTF names?
FUI.BUTTON_0 = FUI.BUTTON_DIGIT_ZERO;
FUI.BUTTON_1 = FUI.BUTTON_DIGIT_ONE;
FUI.BUTTON_2 = FUI.BUTTON_DIGIT_TWO;
FUI.BUTTON_3 = FUI.BUTTON_DIGIT_THREE;
FUI.BUTTON_4 = FUI.BUTTON_DIGIT_FOUR;
FUI.BUTTON_5 = FUI.BUTTON_DIGIT_FIVE;
FUI.BUTTON_6 = FUI.BUTTON_DIGIT_SIX;
FUI.BUTTON_7 = FUI.BUTTON_DIGIT_SEVEN;
FUI.BUTTON_8 = FUI.BUTTON_DIGIT_EIGHT;
FUI.BUTTON_9 = FUI.BUTTON_DIGIT_NINE;

// COLON                          =     0x003A
FUI.BUTTON_SEMICOLON              =     0x003B;
// LESS-THAN SIGN                 =     0x003C
FUI.BUTTON_EQUALS_SIGN            =     0x003D;
  FUI.BUTTON_EQUALS = FUI.BUTTON_EQUALS_SIGN; //TODO allow common, but non-UTF names?
// GREATER-THAN SIGN              =     0x003E
// QUESTION MARK                  =     0x003F
// COMMERCIAL AT                  =     0x0040
FUI.BUTTON_LATIN_CAPITAL_LETTER_A =     0x0041;
FUI.BUTTON_LATIN_CAPITAL_LETTER_B =     0x0042;
FUI.BUTTON_LATIN_CAPITAL_LETTER_C =     0x0043;
FUI.BUTTON_LATIN_CAPITAL_LETTER_D =     0x0044;
FUI.BUTTON_LATIN_CAPITAL_LETTER_E =     0x0045;
FUI.BUTTON_LATIN_CAPITAL_LETTER_F =     0x0046;
FUI.BUTTON_LATIN_CAPITAL_LETTER_G =     0x0047;
FUI.BUTTON_LATIN_CAPITAL_LETTER_H =     0x0048;
FUI.BUTTON_LATIN_CAPITAL_LETTER_I =     0x0049;
FUI.BUTTON_LATIN_CAPITAL_LETTER_J =     0x004A;
FUI.BUTTON_LATIN_CAPITAL_LETTER_K =     0x004B;
FUI.BUTTON_LATIN_CAPITAL_LETTER_L =     0x004C;
FUI.BUTTON_LATIN_CAPITAL_LETTER_M =     0x004D;
FUI.BUTTON_LATIN_CAPITAL_LETTER_N =     0x004E;
FUI.BUTTON_LATIN_CAPITAL_LETTER_O =     0x004F;
FUI.BUTTON_LATIN_CAPITAL_LETTER_P =     0x0050;
FUI.BUTTON_LATIN_CAPITAL_LETTER_Q =     0x0051;
FUI.BUTTON_LATIN_CAPITAL_LETTER_R =     0x0052;
FUI.BUTTON_LATIN_CAPITAL_LETTER_S =     0x0053;
FUI.BUTTON_LATIN_CAPITAL_LETTER_T =     0x0054;
FUI.BUTTON_LATIN_CAPITAL_LETTER_U =     0x0055;
FUI.BUTTON_LATIN_CAPITAL_LETTER_V =     0x0056;
FUI.BUTTON_LATIN_CAPITAL_LETTER_W =     0x0057;
FUI.BUTTON_LATIN_CAPITAL_LETTER_X =     0x0058;
FUI.BUTTON_LATIN_CAPITAL_LETTER_Y =     0x0059;
FUI.BUTTON_LATIN_CAPITAL_LETTER_Z =     0x005A;

//TODO allow common, but non-UTF names?
FUI.BUTTON_A = FUI.BUTTON_LATIN_CAPITAL_LETTER_A;
FUI.BUTTON_B = FUI.BUTTON_LATIN_CAPITAL_LETTER_B;
FUI.BUTTON_C = FUI.BUTTON_LATIN_CAPITAL_LETTER_C;
FUI.BUTTON_D = FUI.BUTTON_LATIN_CAPITAL_LETTER_D;
FUI.BUTTON_E = FUI.BUTTON_LATIN_CAPITAL_LETTER_E;
FUI.BUTTON_F = FUI.BUTTON_LATIN_CAPITAL_LETTER_F;
FUI.BUTTON_G = FUI.BUTTON_LATIN_CAPITAL_LETTER_G;
FUI.BUTTON_H = FUI.BUTTON_LATIN_CAPITAL_LETTER_H;
FUI.BUTTON_I = FUI.BUTTON_LATIN_CAPITAL_LETTER_I;
FUI.BUTTON_J = FUI.BUTTON_LATIN_CAPITAL_LETTER_J;
FUI.BUTTON_K = FUI.BUTTON_LATIN_CAPITAL_LETTER_K;
FUI.BUTTON_L = FUI.BUTTON_LATIN_CAPITAL_LETTER_L;
FUI.BUTTON_M = FUI.BUTTON_LATIN_CAPITAL_LETTER_M;
FUI.BUTTON_N = FUI.BUTTON_LATIN_CAPITAL_LETTER_N;
FUI.BUTTON_O = FUI.BUTTON_LATIN_CAPITAL_LETTER_O;
FUI.BUTTON_P = FUI.BUTTON_LATIN_CAPITAL_LETTER_P;
FUI.BUTTON_Q = FUI.BUTTON_LATIN_CAPITAL_LETTER_Q;
FUI.BUTTON_R = FUI.BUTTON_LATIN_CAPITAL_LETTER_R;
FUI.BUTTON_S = FUI.BUTTON_LATIN_CAPITAL_LETTER_S;
FUI.BUTTON_T = FUI.BUTTON_LATIN_CAPITAL_LETTER_T;
FUI.BUTTON_U = FUI.BUTTON_LATIN_CAPITAL_LETTER_U;
FUI.BUTTON_V = FUI.BUTTON_LATIN_CAPITAL_LETTER_V;
FUI.BUTTON_W = FUI.BUTTON_LATIN_CAPITAL_LETTER_W;
FUI.BUTTON_X = FUI.BUTTON_LATIN_CAPITAL_LETTER_X;
FUI.BUTTON_Y = FUI.BUTTON_LATIN_CAPITAL_LETTER_Y;
FUI.BUTTON_Z = FUI.BUTTON_LATIN_CAPITAL_LETTER_Z;

FUI.BUTTON_LEFT_SQUARE_BRACKET    =     0x005B;
FUI.BUTTON_REVERSE_SOLIDUS        =     0x005C;
  FUI.BUTTON_BACKSLASH = FUI.BUTTON_REVERSE_SOLIDUS; //TODO allow common, but non-UTF names?
FUI.BUTTON_RIGHT_SQUARE_BRACKET   =     0x005D;
// CIRCUMFLEX ACCENT (carrot)               5E
// LOW LINE (underscore)                    5F
FUI.BUTTON_GRAVE_ACCENT           =     0x0060; // The ` char Hint: MySQL
// LATIN SMALL LETTER A through Z        61-7A
// LEFT CURLY BRACKET                       7B
// VERTICAL LINE (pipe)                     7C
// RIGHT CURLY BRACKET                      7D
// TILDE                                    7E
FUI.BUTTON_DELETE                 =     0x007F;  // see note above for BACKSPACE (U+0008)
// NOT the EURO!! that is 20AC            80  // see http://blogs.msdn.com/b/michkap/archive/2005/10/26/484481.aspx

// TODO add other standard UTF characters found on keyboards (oh, to have a non us-en, QWERTY, IBM board...ebay? ;)
FUI.BUTTON_BLACK_DIAMOND          =     0x25C6; //TODO is this the right glyph for the META key? (see http://en.wikipedia.org/wiki/Meta_key)
  FUI.BUTTON_META = FUI.BUTTON_BLACK_DIAMOND;




//** Buttons Extended Block (those not inside Unicode) **//
//arbitrarily chosen, any suggestions for better order?
//TODO maybe keep the physical declarations, coupled with the extended range bit? might get confusing (non-sequential) 'course, NOT using those values might get confusing :P
FUI.BUTTON_F1                     =    0x10001;
FUI.BUTTON_F2                     =    0x10002;
FUI.BUTTON_F3                     =    0x10003;
FUI.BUTTON_F4                     =    0x10004;
FUI.BUTTON_F5                     =    0x10005;
FUI.BUTTON_F6                     =    0x10006;
FUI.BUTTON_F7                     =    0x10007;
FUI.BUTTON_F8                     =    0x10008;
FUI.BUTTON_F9                     =    0x10009;
FUI.BUTTON_F10                    =    0x1000A;
FUI.BUTTON_F11                    =    0x1000B;
FUI.BUTTON_F12                    =    0x1000C;
FUI.BUTTON_F13                    =    0x1000D;
FUI.BUTTON_F14                    =    0x1000E;
FUI.BUTTON_F15                    =    0x1000F;
FUI.BUTTON_F16                    =    0x10010;
FUI.BUTTON_F17                    =    0x10011;
FUI.BUTTON_F18                    =    0x10012;
FUI.BUTTON_F19                    =    0x10013;
FUI.BUTTON_F20                    =    0x10014;
FUI.BUTTON_F21                    =    0x10015;
FUI.BUTTON_F22                    =    0x10016;
FUI.BUTTON_F23                    =    0x10017;
FUI.BUTTON_F24                    =    0x10018;

FUI.BUTTON_PAUSE_BREAK            =    0x10019;
FUI.BUTTON_CAPS_LOCK              =    0x1001A;
FUI.BUTTON_PAGE_UP                =    0x1001B;
FUI.BUTTON_PAGE_DOWN              =    0x1001C;
FUI.BUTTON_END                    =    0x1001D;
FUI.BUTTON_HOME                   =    0x1001E;
FUI.BUTTON_ARROW_LEFT             =    0x1001F;
FUI.BUTTON_ARROW_UP               =    0x10020;
FUI.BUTTON_ARROW_RIGHT            =    0x10021;
FUI.BUTTON_ARROW_DOWN             =    0x10022;
FUI.BUTTON_PRINT_SCREEN           =    0x10023;
FUI.BUTTON_INSERT                 =    0x10024;
FUI.BUTTON_OS                     =    0x10026;
FUI.BUTTON_CONTEXT_MENU           =    0x10027;
FUI.BUTTON_NUMBER_LOCK            =    0x10028;
FUI.BUTTON_SCROLL_LOCK            =    0x10029;
FUI.BUTTON_HELP                   =    0x1002A;  // Probably pointless, likely intercepted before reaching webpage
FUI.BUTTON_SELECT                 =    0x1002B;  // ahh, days of yore
FUI.BUTTON_EXECUTE                =    0x1002C;  // what  happy  lore
FUI.BUTTON_CLEAR                  =    0x1002D;
FUI.BUTTON_SEPARATOR              =    0x1002e;

// Mouse Buttons, reserved for the 11000 range
FUI.BUTTON_POINTER_               =    0x1F000;
FUI.BUTTON_POINTER_LEFT           =    0x1F001;
FUI.BUTTON_POINTER_RIGHT          =    0x1F002;
FUI.BUTTON_POINTER_MIDDLE         =    0x1F003;
FUI.BUTTON_POINTER_AUX_A          =    0x1F004;
FUI.BUTTON_POINTER_AUX_B          =    0x1F005;
// etc


//** Location Specific Buttons **//
FUI.BUTTON_NUMPAD_0                = FUI.BUTTON_LOCATION_NUMPAD | FUI.BUTTON_0;
FUI.BUTTON_NUMPAD_1                = FUI.BUTTON_LOCATION_NUMPAD | FUI.BUTTON_1;
FUI.BUTTON_NUMPAD_2                = FUI.BUTTON_LOCATION_NUMPAD | FUI.BUTTON_2;
FUI.BUTTON_NUMPAD_3                = FUI.BUTTON_LOCATION_NUMPAD | FUI.BUTTON_3;
FUI.BUTTON_NUMPAD_4                = FUI.BUTTON_LOCATION_NUMPAD | FUI.BUTTON_4;
FUI.BUTTON_NUMPAD_5                = FUI.BUTTON_LOCATION_NUMPAD | FUI.BUTTON_5;
FUI.BUTTON_NUMPAD_6                = FUI.BUTTON_LOCATION_NUMPAD | FUI.BUTTON_6;
FUI.BUTTON_NUMPAD_7                = FUI.BUTTON_LOCATION_NUMPAD | FUI.BUTTON_7;
FUI.BUTTON_NUMPAD_8                = FUI.BUTTON_LOCATION_NUMPAD | FUI.BUTTON_8;
FUI.BUTTON_NUMPAD_9                = FUI.BUTTON_LOCATION_NUMPAD | FUI.BUTTON_9;
FUI.BUTTON_NUMPAD_ADD              = FUI.BUTTON_LOCATION_NUMPAD | FUI.BUTTON_PLUS_SIGN;
FUI.BUTTON_NUMPAD_SUBTRACT         = FUI.BUTTON_LOCATION_NUMPAD | FUI.BUTTON_HYPHEN_MINUS;
FUI.BUTTON_NUMPAD_MULTIPLY         = FUI.BUTTON_LOCATION_NUMPAD | FUI.BUTTON_ASTERISK;
FUI.BUTTON_NUMPAD_DIVIDE           = FUI.BUTTON_LOCATION_NUMPAD | FUI.BUTTON_SOLIDUS;
FUI.BUTTON_NUMPAD_SEPARATOR        = FUI.BUTTON_LOCATION_NUMPAD | FUI.BUTTON_SEPARATOR; // comma anywhere? 1 to 1/10 divider
FUI.BUTTON_NUMPAD_FULL_STOP = FUI.BUTTON_NUMPAD_PERIOD = FUI.BUTTON_NUMPAD_COMMA = FUI.BUTTON_NUMPAD_SEPARATOR;


// ---------- ../src/debug/FUI.debug.js ---------- //
var DEBUG = true;

// make the minifier happy
window.console = window.console || {
	info: function () {},
	log: function () {},
	debug: function () {},
	warn: function () {},
	error: function () {}
};

FUI.debug = { level : 10 }; // 0 all, 10 only very important

FUI.debug.log = function ( minLevel, messages) {
	var level = minLevel || 10; // 0 not, 10 very
	var msgObj = messages || {};
	
	if( FUI.debug.level <= level ){
		window.console.log( msgObj );
	}
};

FUI.debug.error = function ( minLevel, messages) {
	var level = minLevel || 10;
	var msgObj = messages || {};
	
	if( FUI.debug.level <= level ){
		window.console.error( msgObj );
	}
};


// ---------- ../src/gesture/FUI.gesture.js ---------- //
FUI.gesture = function () {
	
	this.conditions = [];
	
	this.__currentCondition = false;
	this.__currentCondition_index = false;
	
	return this;
};

FUI.gesture.prototype.__startNewCondition = function () {
	this.__currentCondition_index = this.conditions.push(this.__currentCondition = {});
	this.__currentCondition_index -= 1;
	DEBUG && FUI.debug.log( 10, ["currentCndition index", this.__currentCondition_index] );
};

FUI.gesture.prototype.__addToCurrentCondition = function ( condition ) {
	if( ! this.__currentCondition ){
		this.__startNewCondition();
	}
	
	if( condition.button || condition.pointer ){
		this.__currentCondition = this.conditions[ this.__currentCondition_index ];
	}
	
	for( var n in condition ){
		this.__currentCondition[n] = condition[n];
	}
};



FUI.gesture.prototype.pointer = function ( index ) {
	//TODO 
	this.__addToCurrentCondition({
		pointer : {
			which : index || "all" // or 0x11111111 ? (javascript has precision to 8 hex digits)
		}
	});
	
	this.__currentCondition = this.__currentCondition.pointer;
	
	return this;
};

FUI.gesture.prototype.button = function ( button ) {
	//TODO 
	this.__addToCurrentCondition({
		button : {
			which : button
		}
	});
	
	this.__currentCondition = this.__currentCondition.button;

	return this;
};


FUI.gesture.prototype.down = function () {
	//TODO 
	this.__addToCurrentCondition({
		down : true
	});

	return this;
};

FUI.gesture.prototype.up = function () {
	//TODO 
	this.__addToCurrentCondition({
		up : true
	});

	return this;
};

FUI.gesture.prototype.stillDown = function () {
	//TODO 
	this.__addToCurrentCondition({
		stillDown : true
	});

	return this;
};

FUI.gesture.prototype.move = function () {
	//TODO 
	this.__addToCurrentCondition({
		move : true
	});

	return this;
};


FUI.gesture.prototype.and = function () {
	this.__currentCondition = this.conditions[ this.__currentCondition_index ];
	return this;
};

FUI.gesture.prototype.or = function () {
	this.__startNewCondition();
	//TODO
	return this;
};


FUI.gesture.prototype.givenState = function (state) {
	//TODO
	return false;
};



// 1 or 2 and (3 or 4) and 5 or 6
// or  [1,6]
// and [2,5,{or[3,4]}]
var otherNotation = {
	and : [
		{
			and : [],
			or  : []
		},
		{
			and : [],
			or  : []
		},
	],
	or  : []
};

// Simple BOOLean
FUI.sbool = function (ors, ands) {
	this.ors = ors || [];
	this.ands = ands || [];
};

FUI.sbool.prototype.evaluate = function (data) {
	var isTrue = false;

	for (var n in this.ors){
		isTrue = FUI.sbool.prototype.evaluate_var( this.ors[n], data ) || isTrue;
				
		DEBUG && FUI.debug.log( 10, ["ors", this.ors[n], "isTrue", isTrue, "on n", n] );
		if( isTrue ){
			return true;
		}
	}
	
	if( this.ands.length < 1){
		DEBUG && FUI.debug.log( 10, ["no ands to test", isTrue, this.ands.length] );
		return isTrue;
	}
	isTrue = true;
	
	for( var n in this.ands) {
		isTrue = FUI.sbool.prototype.evaluate_var( this.ands[n], data ) && isTrue;
		
		DEBUG && FUI.debug.log( 10, ["ands", this.ands[n], "isTrue", isTrue, "on n", n] );
		
		if ( ! isTrue ){
			return isTrue;
		}
	}
	
	
	return isTrue;
		
};

FUI.sbool.prototype.evaluate_var = function ( variable, data ) {
	
	switch( typeof variable) {
		case "object":
			if( variable.evaluate ){
				return variable.evaluate(data);
			}else{
				FUI.debug.error( 10, ["unknown object type", variable ] );
			}
			break;
		case "undefined":
			return false;
			break;
		case "boolean":
			return variable;
			break;
		case "function":
			return variable.apply(data);
			break;
		case "number":
		default:
			FUI.debug.error( 10, ["not implemented yet", variable ] );
			break;
	}
	
	return false;
};

//1 or 2 and (3 or 4) and 5 or 6
//or  [1,6]
//and [2,5,{or[3,4]}]
var otherNotation_imp = new FUI.sbool(
	[1, 6],
	[2, 5, new FUI.sbool([3,4])]
);

//f or t and (f or t) and t or f
//or  [f,f]
//and [t,t,{or[f,t]}]
var otherNotation_impBool = new FUI.sbool(
	[false, false],
	[true, true, new FUI.sbool([false,true])]
);

var otherNotation_impBool_small = new FUI.sbool([false,true]);







FUI.gbool = FUI.sbool;
FUI.gbool.prototype = FUI.sbool.prototype;

FUI.gbool.prototype.evaluate = function (data) {
	DEBUG && FUI.debug.log( 4, ["gbool, data in:", data ] );
	var isTrue = false;

	for (var n in this.ors){
		isTrue = isTrue || FUI.sbool.prototype.evaluate_var( this.ors[n], data );
				
		DEBUG && FUI.debug.log( 3, ["ors", this.ors[n], "isTrue", isTrue, "on n", n] );
		if( isTrue ){
			DEBUG && FUI.debug.log( 3, ["gbool, at least one or found true, breaking" ] );
			break;
		}
	}
	
	if( this.ands.length < 1){
		DEBUG && FUI.debug.log( 3, ["no ands to test", isTrue, this.ands.length] );
		return isTrue;
	}
	//isTrue = true;
	
	for( var n in this.ands) {
		isTrue = isTrue && FUI.sbool.prototype.evaluate_var( this.ands[n], data );
		
		DEBUG && FUI.debug.log( 3, ["ands", this.ands[n], "isTrue", isTrue, "on n", n] );
		
		if ( ! isTrue ){
			DEBUG && FUI.debug.log( 3, ["gbool, !isTrue, ret", isTrue ] );
			return isTrue;
		}
	}
	
	DEBUG && FUI.debug.log( 4, ["gbool, final return", isTrue ] );
	return isTrue;
		
};

FUI.gbool.prototype.evaluate_var = function ( variable, data ) {
	
	switch( typeof variable) {
		case "object":
			if( variable.evaluate ){
				return variable.evaluate(data);
			}else{
				FUI.debug.error( 10, ["unknown object type", variable ] );
			}
			break;
		case "undefined":
			return false;
			break;
		case "boolean":
			return variable;
			break;
		case "function":
			return variable.apply(data);
			break;
		case "number":
			// we've got a button!
			if ( (variable & FUI.MASK_BUTTON_POINTER) == FUI.MASK_BUTTON_POINTER ) {
				// mouse
				var toReturn = data.pointers.mouse ? data.pointers.mouse[variable] : false;
				DEBUG && FUI.debug.log( 3, ["gbool mouse", variable, data.pointers.mouse ? data.pointers.mouse[variable] : "undefined data.pointers.mouse :(", toReturn ] );
				
				return toReturn;
			} else {
				// buttons
				
				var toReturn = ((data.buttons[variable] != undefined) ?
							( (data.buttons[variable].down != undefined) ? data.buttons[variable].down : data.buttons[variable] ) :
						 false);
				DEBUG && FUI.debug.log( 3, ["gbool buttons", variable, data.buttons[variable], toReturn ] );
				return toReturn;
			}
			break;
		default:
			FUI.debug.error( 10, ["not implemented yet", variable, data ] );
			break;
	}
	
	return false;
};


// ---------- ../src/driver_s/FUI.driver.js ---------- //
FUI.driver = {};

//** Buttons **//
//see the generating doc (docs/files/buttonNaming.ods)
FUI.driver.physicalKeys = {
	BUTTON_LBUTTON              : 0x01,
	BUTTON_RBUTTON              : 0x02,
	BUTTON_CANCEL               : 0x03,
	BUTTON_MBUTTON              : 0x04,
	BUTTON_XBUTTON1             : 0x05,
	BUTTON_XBUTTON2             : 0x06,
	//Undefined                   0x07
	BUTTON_BACK                 : 0x08,
	BUTTON_TAB                  : 0x09,
	//Reserved                    0x0A-0B
	BUTTON_CLEAR                : 0x0C,
	BUTTON_RETURN               : 0x0D,
	//Undefined                   0x0E-0F
	BUTTON_SHIFT                : 0x10,
	BUTTON_CONTROL              : 0x11,
	BUTTON_MENU                 : 0x12,
	BUTTON_PAUSE                : 0x13,
	BUTTON_CAPITAL              : 0x14,
	BUTTON_KANA                 : 0x15,
	BUTTON_HANGUEL              : 0x15,
	BUTTON_HANGUL               : 0x15,
	//Undefined                   0x16
	BUTTON_JUNJA                : 0x17,
	BUTTON_FINAL                : 0x18,
	BUTTON_HANJA                : 0x19,
	BUTTON_KANJI                : 0x19,
	//Undefined                   0x1A
	BUTTON_ESCAPE               : 0x1B,
	BUTTON_CONVERT              : 0x1C,
	BUTTON_NONCONVERT           : 0x1D,
	BUTTON_ACCEPT               : 0x1E,
	BUTTON_MODECHANGE           : 0x1F,
	BUTTON_SPACE                : 0x20,
	BUTTON_PRIOR                : 0x21,
	BUTTON_NEXT                 : 0x22,
	BUTTON_END                  : 0x23,
	BUTTON_HOME                 : 0x24,
	BUTTON_LEFT                 : 0x25,
	BUTTON_UP                   : 0x26,
	BUTTON_RIGHT                : 0x27,
	BUTTON_DOWN                 : 0x28,
	BUTTON_SELECT               : 0x29,
	BUTTON_PRINT                : 0x2A,
	BUTTON_EXECUTE              : 0x2B,
	BUTTON_SNAPSHOT             : 0x2C,
	BUTTON_INSERT               : 0x2D,
	BUTTON_DELETE               : 0x2E,
	BUTTON_HELP                 : 0x2F,
	BUTTON_0                    : 0x30,
	BUTTON_1                    : 0x31,
	BUTTON_2                    : 0x32,
	BUTTON_3                    : 0x33,
	BUTTON_4                    : 0x34,
	BUTTON_5                    : 0x35,
	BUTTON_6                    : 0x36,
	BUTTON_7                    : 0x37,
	BUTTON_8                    : 0x38,
	BUTTON_9                    : 0x39,
	//Undefined                   0x3A-40
	BUTTON_A                    : 0x41,
	BUTTON_B                    : 0x42,
	BUTTON_C                    : 0x43,
	BUTTON_D                    : 0x44,
	BUTTON_E                    : 0x45,
	BUTTON_F                    : 0x46,
	BUTTON_G                    : 0x47,
	BUTTON_H                    : 0x48,
	BUTTON_I                    : 0x49,
	BUTTON_J                    : 0x4A,
	BUTTON_K                    : 0x4B,
	BUTTON_L                    : 0x4C,
	BUTTON_M                    : 0x4D,
	BUTTON_N                    : 0x4E,
	BUTTON_O                    : 0x4F,
	BUTTON_P                    : 0x50,
	BUTTON_Q                    : 0x51,
	BUTTON_R                    : 0x52,
	BUTTON_S                    : 0x53,
	BUTTON_T                    : 0x54,
	BUTTON_U                    : 0x55,
	BUTTON_V                    : 0x56,
	BUTTON_W                    : 0x57,
	BUTTON_X                    : 0x58,
	BUTTON_Y                    : 0x59,
	BUTTON_Z                    : 0x5A,
	BUTTON_OS_LEFT              : 0x5B, // LWIN
	BUTTON_OS_RIGHT             : 0x5C, // RWIN
	BUTTON_APPS                 : 0x5D,
	//Reserved                    0x5E
	BUTTON_SLEEP                : 0x5F,
	BUTTON_NUMPAD0              : 0x60,
	BUTTON_NUMPAD1              : 0x61,
	BUTTON_NUMPAD2              : 0x62,
	BUTTON_NUMPAD3              : 0x63,
	BUTTON_NUMPAD4              : 0x64,
	BUTTON_NUMPAD5              : 0x65,
	BUTTON_NUMPAD6              : 0x66,
	BUTTON_NUMPAD7              : 0x67,
	BUTTON_NUMPAD8              : 0x68,
	BUTTON_NUMPAD9              : 0x69,
	BUTTON_MULTIPLY             : 0x6A,
	BUTTON_ADD                  : 0x6B,
	BUTTON_SEPARATOR            : 0x6C,
	BUTTON_SUBTRACT             : 0x6D,
	BUTTON_DECIMAL              : 0x6E,
	BUTTON_DIVIDE               : 0x6F,
	BUTTON_F1                   : 0x70,
	BUTTON_F2                   : 0x71,
	BUTTON_F3                   : 0x72,
	BUTTON_F4                   : 0x73,
	BUTTON_F5                   : 0x74,
	BUTTON_F6                   : 0x75,
	BUTTON_F7                   : 0x76,
	BUTTON_F8                   : 0x77,
	BUTTON_F9                   : 0x78,
	BUTTON_F10                  : 0x79,
	BUTTON_F11                  : 0x7A,
	BUTTON_F12                  : 0x7B,
	BUTTON_F13                  : 0x7C,
	BUTTON_F14                  : 0x7D,
	BUTTON_F15                  : 0x7E,
	BUTTON_F16                  : 0x7F,
	BUTTON_F17                  : 0x80,
	BUTTON_F18                  : 0x81,
	BUTTON_F19                  : 0x82,
	BUTTON_F20                  : 0x83,
	BUTTON_F21                  : 0x84,
	BUTTON_F22                  : 0x85,
	BUTTON_F23                  : 0x86,
	BUTTON_F24                  : 0x87,
	//Unassigned                  0x88-8F
	BUTTON_NUMLOCK              : 0x90,
	BUTTON_SCROLL               : 0x91,
	//OEM specific                0x92-96
	//Unassigned                  0x97-9F
	BUTTON_LSHIFT               : 0xA0,
	BUTTON_RSHIFT               : 0xA1,
	BUTTON_LCONTROL             : 0xA2,
	BUTTON_RCONTROL             : 0xA3,
	BUTTON_LMENU                : 0xA4,
	BUTTON_RMENU                : 0xA5,
	BUTTON_BROWSER_BACK         : 0xA6,
	BUTTON_BROWSER_FORWARD      : 0xA7,
	BUTTON_BROWSER_REFRESH      : 0xA8,
	BUTTON_BROWSER_STOP         : 0xA9,
	BUTTON_BROWSER_SEARCH       : 0xAA,
	BUTTON_BROWSER_FAVORITES    : 0xAB,
	BUTTON_BROWSER_HOME         : 0xAC,
	BUTTON_VOLUME_MUTE          : 0xAD,
	BUTTON_VOLUME_DOWN          : 0xAE,
	BUTTON_VOLUME_UP            : 0xAF,
	BUTTON_MEDIA_NEXT_TRACK     : 0xB0,
	BUTTON_MEDIA_PREV_TRACK     : 0xB1,
	BUTTON_MEDIA_STOP           : 0xB2,
	BUTTON_MEDIA_PLAY_PAUSE     : 0xB3,
	BUTTON_LAUNCH_MAIL          : 0xB4,
	BUTTON_LAUNCH_MEDIA_SELECT  : 0xB5,
	BUTTON_LAUNCH_APP1          : 0xB6,
	BUTTON_LAUNCH_APP2          : 0xB7,
	//Reserved                    0xB8-B9
	BUTTON_OEM_1                : 0xBA,
	BUTTON_OEM_PLUS             : 0xBB,
	BUTTON_OEM_COMMA            : 0xBC,
	BUTTON_OEM_MINUS            : 0xBD,
	BUTTON_OEM_PERIOD           : 0xBE,
	BUTTON_OEM_2                : 0xBF,
	BUTTON_OEM_3                : 0xC0,
	//Reserved                    0xC1-D7
	//Unassigned                  0xD8-DA
	BUTTON_OEM_4                : 0xDB,
	BUTTON_OEM_5                : 0xDC,
	BUTTON_OEM_6                : 0xDD,
	BUTTON_OEM_7                : 0xDE,
	BUTTON_OEM_8                : 0xDF,
	//Reserved                    0xE0
	//OEM specific                0xE1
	BUTTON_OEM_102              : 0xE2,
	//OEM specific                0xE3-E4
	BUTTON_PROCESSKEY           : 0xE5,
	//OEM specific                0xE6
	//Used to pass Unicode char.. 0xE7
	//Unassigned                  0xE8
	//OEM specific                0xE9-F5
	BUTTON_ATTN                 : 0xF6,
	BUTTON_CRSEL                : 0xF7,
	BUTTON_EXSEL                : 0xF8,
	BUTTON_EREOF                : 0xF9,
	BUTTON_PLAY                 : 0xFA,
	BUTTON_ZOOM                 : 0xFB,
	BUTTON_NONAME               : 0xFC,
	BUTTON_PA1                  : 0xFD,
	BUTTON_OEM_CLEAR            : 0xFE
};


// ---------- ../src/driver_s/FUI.drivers.js ---------- //
FUI.drivers = {
	browser : {},
	keyboard: {}
};

/*

"Drivers" are currently a way to just get this working

still undecided whether to use browser specific drivers or just use a general-purpose cross-browser approximation that makes concessions
probably use a driver system with the default to the latter, allowing specific adaptations when greater control is desired - say for a Wacom Bamboo (differentiate between the mouse)

as such, the API is:

um...see the firefox file...for now
(I'm being bad, standardize first, then implement :'( )

*/


// ---------- ../src/driver_s/keyboard/FUI.driver.keyboard.js ---------- //
FUI.driver.keyboard = function () {};
FUI.driver.keyboard.prototype = {
	constructor : FUI.driver.keyboard,
	buttonTable : {}
};

FUI.drivers.keyboard.defaultDriver = new FUI.driver.keyboard();

//TODO ??? move, at least
FUI.uRep = function (buttonConstant, toLower) {
	if( ! buttonConstant ){
		return false;
	}
	var prepended = "0000"+buttonConstant.toString(16);
	prepended = "U+" + prepended.substring(prepended.length - 4);
	return toLower ? prepended.toLowerCase() : prepended;
};

//-- build the button translation table --//
// make the minified version smaller, seems hackish :'(
//only took the minified version down ~9kb (from 37.206 kb to 28.644 kb) :S
if( __t1 ){
	window.__t_ORIG = __t1;
	__t1 = undefined;
}
if( __t2 ){
	window.__2_ORIG = __t2;
	__t2 = undefined;
}

var __t1 = FUI.driver.keyboard.prototype.buttonTable;
var __t2 = FUI.driver.physicalKeys;
//__t1[ __t2.BUTTON_LBUTTON ]             = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_RBUTTON ]             = [ FUI.BUTTON_ ];
__t1[ __t2.BUTTON_CANCEL ]              = [ FUI.BUTTON_PAUSE_BREAK ];
//__t1[ __t2.BUTTON_MBUTTON ]             = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_XBUTTON1 ]            = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_XBUTTON2 ]            = [ FUI.BUTTON_ ];
__t1[ __t2.BUTTON_BACK ]                = [ FUI.BUTTON_BACKSPACE ];
__t1[ __t2.BUTTON_TAB ]                 = [ FUI.BUTTON_TAB ];
__t1[ __t2.BUTTON_CLEAR ]               = [ FUI.BUTTON_CLEAR ];
__t1[ __t2.BUTTON_RETURN ]              = [ FUI.BUTTON_ENTER ];
__t1[ __t2.BUTTON_SHIFT ]               = [ FUI.BUTTON_SHIFT ];
__t1[ __t2.BUTTON_CONTROL ]             = [ FUI.BUTTON_CONTROL ];
__t1[ __t2.BUTTON_MENU ]                = [ FUI.BUTTON_CONTEXT_MENU ];
__t1[ __t2.BUTTON_PAUSE ]               = [ FUI.BUTTON_PAUSE_BREAK ];
__t1[ __t2.BUTTON_CAPITAL ]             = [ FUI.BUTTON_CAPS_LOCK ];
//__t1[ __t2.BUTTON_KANA ]                = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_HANGUEL ]             = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_HANGUL ]              = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_JUNJA ]               = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_FINAL ]               = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_HANJA ]               = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_KANJI ]               = [ FUI.BUTTON_ ];
__t1[ __t2.BUTTON_ESCAPE ]              = [ FUI.BUTTON_ESCAPE ];
//__t1[ __t2.BUTTON_CONVERT ]             = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_NONCONVERT ]          = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_ACCEPT ]              = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_MODECHANGE ]          = [ FUI.BUTTON_ ];
__t1[ __t2.BUTTON_SPACE ]               = [ FUI.BUTTON_SPACE ];
__t1[ __t2.BUTTON_PRIOR ]               = [ FUI.BUTTON_PAGE_UP ];
__t1[ __t2.BUTTON_NEXT ]                = [ FUI.BUTTON_PAGE_DOWN ];
__t1[ __t2.BUTTON_END ]                 = [ FUI.BUTTON_END ];
__t1[ __t2.BUTTON_HOME ]                = [ FUI.BUTTON_HOME ];
__t1[ __t2.BUTTON_LEFT ]                = [ FUI.BUTTON_ARROW_LEFT ];
__t1[ __t2.BUTTON_UP ]                  = [ FUI.BUTTON_ARROW_UP ];
__t1[ __t2.BUTTON_RIGHT ]               = [ FUI.BUTTON_ARROW_RIGHT ];
__t1[ __t2.BUTTON_DOWN ]                = [ FUI.BUTTON_ARROW_DOWN ];
__t1[ __t2.BUTTON_SELECT ]              = [ FUI.BUTTON_SELECT ];
//__t1[ __t2.BUTTON_PRINT ]               = [ FUI.BUTTON_ ]; //?
__t1[ __t2.BUTTON_EXECUTE ]             = [ FUI.BUTTON_EXECUTE ];
__t1[ __t2.BUTTON_SNAPSHOT ]            = [ FUI.BUTTON_PRINT_SCREEN ];
__t1[ __t2.BUTTON_INSERT ]              = [ FUI.BUTTON_INSERT ];
__t1[ __t2.BUTTON_DELETE ]              = [ FUI.BUTTON_DELETE ];
__t1[ __t2.BUTTON_HELP ]                = [ FUI.BUTTON_HELP ];
__t1[ __t2.BUTTON_0 ]                   = [ FUI.BUTTON_DIGIT_ZERO ];
__t1[ __t2.BUTTON_1 ]                   = [ FUI.BUTTON_DIGIT_ONE ];
__t1[ __t2.BUTTON_2 ]                   = [ FUI.BUTTON_DIGIT_TWO ];
__t1[ __t2.BUTTON_3 ]                   = [ FUI.BUTTON_DIGIT_THREE ];
__t1[ __t2.BUTTON_4 ]                   = [ FUI.BUTTON_DIGIT_FOUR ];
__t1[ __t2.BUTTON_5 ]                   = [ FUI.BUTTON_DIGIT_FIVE ];
__t1[ __t2.BUTTON_6 ]                   = [ FUI.BUTTON_DIGIT_SIX ];
__t1[ __t2.BUTTON_7 ]                   = [ FUI.BUTTON_DIGIT_SEVEN ];
__t1[ __t2.BUTTON_8 ]                   = [ FUI.BUTTON_DIGIT_EIGHT ];
__t1[ __t2.BUTTON_9 ]                   = [ FUI.BUTTON_DIGIT_NINE ];
__t1[ __t2.BUTTON_A ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_A ];
__t1[ __t2.BUTTON_B ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_B ];
__t1[ __t2.BUTTON_C ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_C ];
__t1[ __t2.BUTTON_D ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_D ];
__t1[ __t2.BUTTON_E ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_E ];
__t1[ __t2.BUTTON_F ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_F ];
__t1[ __t2.BUTTON_G ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_G ];
__t1[ __t2.BUTTON_H ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_H ];
__t1[ __t2.BUTTON_I ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_I ];
__t1[ __t2.BUTTON_J ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_J ];
__t1[ __t2.BUTTON_K ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_K ];
__t1[ __t2.BUTTON_L ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_L ];
__t1[ __t2.BUTTON_M ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_M ];
__t1[ __t2.BUTTON_N ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_N ];
__t1[ __t2.BUTTON_O ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_O ];
__t1[ __t2.BUTTON_P ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_P ];
__t1[ __t2.BUTTON_Q ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_Q ];
__t1[ __t2.BUTTON_R ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_R ];
__t1[ __t2.BUTTON_S ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_S ];
__t1[ __t2.BUTTON_T ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_T ];
__t1[ __t2.BUTTON_U ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_U ];
__t1[ __t2.BUTTON_V ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_V ];
__t1[ __t2.BUTTON_W ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_W ];
__t1[ __t2.BUTTON_X ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_X ];
__t1[ __t2.BUTTON_Y ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_Y ];
__t1[ __t2.BUTTON_Z ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_Z ];
__t1[ __t2.BUTTON_OS_LEFT ]             = [ FUI.BUTTON_OS ]; // LWIN
__t1[ __t2.BUTTON_OS_RIGHT ]            = [ FUI.BUTTON_OS ]; // RWIN
//__t1[ __t2.BUTTON_APPS ]                = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_SLEEP ]               = [ FUI.BUTTON_ ];
__t1[ __t2.BUTTON_NUMPAD0 ]             = [ FUI.BUTTON_NUMPAD_0 ];
__t1[ __t2.BUTTON_NUMPAD1 ]             = [ FUI.BUTTON_NUMPAD_1 ];
__t1[ __t2.BUTTON_NUMPAD2 ]             = [ FUI.BUTTON_NUMPAD_2 ];
__t1[ __t2.BUTTON_NUMPAD3 ]             = [ FUI.BUTTON_NUMPAD_3 ];
__t1[ __t2.BUTTON_NUMPAD4 ]             = [ FUI.BUTTON_NUMPAD_4 ];
__t1[ __t2.BUTTON_NUMPAD5 ]             = [ FUI.BUTTON_NUMPAD_5 ];
__t1[ __t2.BUTTON_NUMPAD6 ]             = [ FUI.BUTTON_NUMPAD_6 ];
__t1[ __t2.BUTTON_NUMPAD7 ]             = [ FUI.BUTTON_NUMPAD_7 ];
__t1[ __t2.BUTTON_NUMPAD8 ]             = [ FUI.BUTTON_NUMPAD_8 ];
__t1[ __t2.BUTTON_NUMPAD9 ]             = [ FUI.BUTTON_NUMPAD_9 ];
__t1[ __t2.BUTTON_MULTIPLY ]            = [ FUI.BUTTON_NUMPAD_MULTIPLY ];
__t1[ __t2.BUTTON_ADD ]                 = [ FUI.BUTTON_NUMPAD_ADD ];
__t1[ __t2.BUTTON_SEPARATOR ]           = [ FUI.BUTTON_SEPARATOR ];
__t1[ __t2.BUTTON_SUBTRACT ]            = [ FUI.BUTTON_NUMPAD_SUBTRACT ];
__t1[ __t2.BUTTON_DECIMAL ]             = [ FUI.BUTTON_SEPARATOR ];
__t1[ __t2.BUTTON_DIVIDE ]              = [ FUI.BUTTON_NUMPAD_DIVIDE ];
__t1[ __t2.BUTTON_F1 ]                  = [ FUI.BUTTON_F1 ];
__t1[ __t2.BUTTON_F2 ]                  = [ FUI.BUTTON_F2 ];
__t1[ __t2.BUTTON_F3 ]                  = [ FUI.BUTTON_F3 ];
__t1[ __t2.BUTTON_F4 ]                  = [ FUI.BUTTON_F4 ];
__t1[ __t2.BUTTON_F5 ]                  = [ FUI.BUTTON_F5 ];
__t1[ __t2.BUTTON_F6 ]                  = [ FUI.BUTTON_F6 ];
__t1[ __t2.BUTTON_F7 ]                  = [ FUI.BUTTON_F7 ];
__t1[ __t2.BUTTON_F8 ]                  = [ FUI.BUTTON_F8 ];
__t1[ __t2.BUTTON_F9 ]                  = [ FUI.BUTTON_F9 ];
__t1[ __t2.BUTTON_F10 ]                 = [ FUI.BUTTON_F10 ];
__t1[ __t2.BUTTON_F11 ]                 = [ FUI.BUTTON_F11 ];
__t1[ __t2.BUTTON_F12 ]                 = [ FUI.BUTTON_F12 ];
__t1[ __t2.BUTTON_F13 ]                 = [ FUI.BUTTON_F13 ];
__t1[ __t2.BUTTON_F14 ]                 = [ FUI.BUTTON_F14 ];
__t1[ __t2.BUTTON_F15 ]                 = [ FUI.BUTTON_F15 ];
__t1[ __t2.BUTTON_F16 ]                 = [ FUI.BUTTON_F16 ];
__t1[ __t2.BUTTON_F17 ]                 = [ FUI.BUTTON_F17 ];
__t1[ __t2.BUTTON_F18 ]                 = [ FUI.BUTTON_F18 ];
__t1[ __t2.BUTTON_F19 ]                 = [ FUI.BUTTON_F19 ];
__t1[ __t2.BUTTON_F20 ]                 = [ FUI.BUTTON_F20 ];
__t1[ __t2.BUTTON_F21 ]                 = [ FUI.BUTTON_F21 ];
__t1[ __t2.BUTTON_F22 ]                 = [ FUI.BUTTON_F22 ];
__t1[ __t2.BUTTON_F23 ]                 = [ FUI.BUTTON_F23 ];
__t1[ __t2.BUTTON_F24 ]                 = [ FUI.BUTTON_F24 ];
__t1[ __t2.BUTTON_NUMLOCK ]             = [ FUI.BUTTON_NUMBER_LOCK ];
__t1[ __t2.BUTTON_SCROLL ]              = [ FUI.BUTTON_SCROLL_LOCK ];
__t1[ __t2.BUTTON_LSHIFT ]              = [ FUI.BUTTON_SHIFT ];
__t1[ __t2.BUTTON_RSHIFT ]              = [ FUI.BUTTON_SHIFT ];
__t1[ __t2.BUTTON_LCONTROL ]            = [ FUI.BUTTON_CONTROL ];
__t1[ __t2.BUTTON_RCONTROL ]            = [ FUI.BUTTON_CONTROL ];
__t1[ __t2.BUTTON_LMENU ]               = [ FUI.BUTTON_CONTEXT_MENU ];
__t1[ __t2.BUTTON_RMENU ]               = [ FUI.BUTTON_CONTEXT_MENU ];
//__t1[ __t2.BUTTON_BROWSER_BACK ]        = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_BROWSER_FORWARD ]     = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_BROWSER_REFRESH ]     = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_BROWSER_STOP ]        = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_BROWSER_SEARCH ]      = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_BROWSER_FAVORITES ]   = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_BROWSER_HOME ]        = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_VOLUME_MUTE ]         = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_VOLUME_DOWN ]         = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_VOLUME_UP ]           = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_MEDIA_NEXT_TRACK ]    = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_MEDIA_PREV_TRACK ]    = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_MEDIA_STOP ]          = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_MEDIA_PLAY_PAUSE ]    = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_LAUNCH_MAIL ]         = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_LAUNCH_MEDIA_SELECT ] = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_LAUNCH_APP1 ]         = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_LAUNCH_APP2 ]         = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_PROCESSKEY ]          = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_ATTN ]                = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_CRSEL ]               = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_EXSEL ]               = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_EREOF ]               = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_PLAY ]                = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_ZOOM ]                = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_NONAME ]              = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_PA1 ]                 = [ FUI.BUTTON_ ];
__t1[ __t2.BUTTON_OEM_CLEAR ]           = [ FUI.BUTTON_CLEAR ];
// for US keyboards, this is the most likely area for changes
__t1[ __t2.BUTTON_OEM_PLUS ]            = [ FUI.BUTTON_PLUS_SIGN ];
__t1[ __t2.BUTTON_OEM_COMMA ]           = [ FUI.BUTTON_COMMA ];
__t1[ __t2.BUTTON_OEM_MINUS ]           = [ FUI.BUTTON_HYPHEN_MINUS ];
__t1[ __t2.BUTTON_OEM_PERIOD ]          = [ FUI.BUTTON_PERIOD ];
// but mostly this section:
__t1[ __t2.BUTTON_OEM_1 ]               = [ FUI.BUTTON_SEMICOLON ];
__t1[ __t2.BUTTON_OEM_2 ]               = [ FUI.BUTTON_SOLIDUS ];
__t1[ __t2.BUTTON_OEM_3 ]               = [ FUI.BUTTON_GRAVE_ACCENT ];
__t1[ __t2.BUTTON_OEM_4 ]               = [ FUI.BUTTON_LEFT_SQUARE_BRACKET ];
__t1[ __t2.BUTTON_OEM_5 ]               = [ FUI.BUTTON_REVERSE_SOLIDUS ];
__t1[ __t2.BUTTON_OEM_6 ]               = [ FUI.BUTTON_RIGHT_SQUARE_BRACKET ];
__t1[ __t2.BUTTON_OEM_7 ]               = [ FUI.BUTTON_APOSTROPHE ];
//__t1[ __t2.BUTTON_OEM_8 ]               = [ FUI.BUTTON_ ];
//__t1[ __t2.BUTTON_OEM_102 ]             = [ FUI.BUTTON_ ];

// add in extras not found otherwise
// *cough* firefox *cough*
__t1[ 0x3B ]               = [ FUI.BUTTON_SEMICOLON ];
__t1[ 0x3D ]               = [ FUI.BUTTON_EQUALS_SIGN ];
__t1[ 0xAD ]               = [ FUI.BUTTON_HYPHEN_MINUS ]; // BUTTON_VOLUME_MUTE odd


// And define for all string values returned by WebKit (see https://trac.webkit.org/browser/trunk/Source/WebKit/chromium/src/WebInputEvent.cpp)
// TODO kindof a redefinition of what lies above, perhaps instead translate from string to physical key and then proceed as normal?
__t1[ "Alt" ]         = [ FUI.BUTTON_ALT ];
__t1[ "Control" ]     = [ FUI.BUTTON_CONTROL ];
__t1[ "Shift" ]       = [ FUI.BUTTON_SHIFT ];
__t1[ "CapsLock" ]    = [ FUI.BUTTON_CAPS_LOCK ];
__t1[ "Win" ]         = [ FUI.BUTTON_OS ];
__t1[ "Clear" ]       = [ FUI.BUTTON_CLEAR ];
__t1[ "Down" ]        = [ FUI.BUTTON_ARROW_DOWN ];
__t1[ "End" ]         = [ FUI.BUTTON_END ];
__t1[ "Enter" ]       = [ FUI.BUTTON_ENTER ];
__t1[ "Execute" ]     = [ FUI.BUTTON_EXECUTE ];
__t1[ "F1" ]          = [ FUI.BUTTON_F1  ];
__t1[ "F2" ]          = [ FUI.BUTTON_F2  ];
__t1[ "F3" ]          = [ FUI.BUTTON_F3  ];
__t1[ "F4" ]          = [ FUI.BUTTON_F4  ];
__t1[ "F5" ]          = [ FUI.BUTTON_F5  ];
__t1[ "F6" ]          = [ FUI.BUTTON_F6  ];
__t1[ "F7" ]          = [ FUI.BUTTON_F7  ];
__t1[ "F8" ]          = [ FUI.BUTTON_F8  ];
__t1[ "F9" ]          = [ FUI.BUTTON_F9  ];
__t1[ "F10" ]         = [ FUI.BUTTON_F10 ];
__t1[ "F11" ]         = [ FUI.BUTTON_F11 ];
__t1[ "F12" ]         = [ FUI.BUTTON_F12 ];
__t1[ "F13" ]         = [ FUI.BUTTON_F13 ];
__t1[ "F14" ]         = [ FUI.BUTTON_F14 ];
__t1[ "F15" ]         = [ FUI.BUTTON_F15 ];
__t1[ "F16" ]         = [ FUI.BUTTON_F16 ];
__t1[ "F17" ]         = [ FUI.BUTTON_F17 ];
__t1[ "F18" ]         = [ FUI.BUTTON_F18 ];
__t1[ "F19" ]         = [ FUI.BUTTON_F19 ];
__t1[ "F20" ]         = [ FUI.BUTTON_F20 ];
__t1[ "F21" ]         = [ FUI.BUTTON_F21 ];
__t1[ "F22" ]         = [ FUI.BUTTON_F22 ];
__t1[ "F23" ]         = [ FUI.BUTTON_F23 ];
__t1[ "F24" ]         = [ FUI.BUTTON_F24 ];
__t1[ "Help" ]        = [ FUI.BUTTON_HELP ];
__t1[ "Home" ]        = [ FUI.BUTTON_HOME ];
__t1[ "Insert" ]      = [ FUI.BUTTON_INSERT ];
__t1[ "Left" ]        = [ FUI.BUTTON_ARROW_LEFT ];
__t1[ "PageDown" ]    = [ FUI.BUTTON_PAGE_DOWN ];
__t1[ "PageUp" ]      = [ FUI.BUTTON_PAGE_UP ];
__t1[ "Pause" ]       = [ FUI.BUTTON_PAUSE_BREAK ];
__t1[ "PrintScreen" ] = [ FUI.BUTTON_PRINT_SCREEN ];
__t1[ "Right" ]       = [ FUI.BUTTON_ARROW_RIGHT ];
__t1[ "Scroll" ]      = [ FUI.BUTTON_SCROLL_LOCK ];
__t1[ "Select" ]      = [ FUI.BUTTON_SELECT ];
__t1[ "Up" ]          = [ FUI.BUTTON_ARROW_UP ];
/* // not recognized as not reported by browsers tested
__t1[ "MediaNextTrack" ] = [ FUI.BUTTON_"MediaNextTrack" ];
__t1[ "MediaPreviousTrack" ] = [ FUI.BUTTON_"MediaPreviousTrack" ];
__t1[ "MediaStop" ] = [ FUI.BUTTON_"MediaStop" ];
__t1[ "MediaPlayPause" ] = [ FUI.BUTTON_"MediaPlayPause" ];
__t1[ "VolumeMute" ] = [ FUI.BUTTON_"VolumeMute" ];
__t1[ "VolumeDown" ] = [ FUI.BUTTON_"VolumeDown" ];
__t1[ "VolumeUp" ] = [ FUI.BUTTON_"VolumeUp" ];
//*/


if( window.__t1_ORIG ){
	__t1 = window.__t1_ORIG;
	delete window.__t1_ORIG;
}else{
	__t1 = undefined;
}
if( window.__t2_ORIG ){
	__t2 = window.__t2_ORIG;
	delete window.__t2_ORIG;
}else{
	__t2 = undefined;
}


// ---------- ../src/driver_s/browser/FUI.driver.browser.js ---------- //
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


// ---------- ../src/driver_s/browser/firefox/FUI.drivers.browser.firefox.js ---------- //
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


// ---------- ../src/adapter/FUI.adapter.js ---------- //
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


