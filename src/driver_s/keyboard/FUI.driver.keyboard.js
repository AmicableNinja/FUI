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

/* // by FUI.BUTTON_ definition (requires lengthy lookup loop)
FUI.driver.keyboard.prototype.buttonTable[ FUI.BUTTON_BACKSPACE ] = [ FUI.uRep(FUI.driver.physicalKeys.BUTTON_BACK), FUI.driver.physicalKeys.BUTTON_BACK ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.BUTTON_DELETE ]    = [ FUI.uRep(FUI.driver.physicalKeys.BUTTON_DELETE), FUI.driver.physicalKeys.BUTTON_DELETE ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.BUTTON_PAGE_DOWN ] = [ "PAGEDOWN", FUI.driver.physicalKeys.BUTTON_PAGE_DOWN ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.BUTTON_6 ]         = [ FUI.uRep( FUI.driver.physicalKeys.BUTTON_6), FUI.driver.physicalKeys.BUTTON_6 ];
//*/

//* // by physical keys definition, requires more entries
//FUI.driver.keyboard.prototype.buttonTable[ FUI.uRep(FUI.driver.physicalKeys.BUTTON_BACK) ] = [ FUI.BUTTON_BACKSPACE ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_BACK ] = [ FUI.BUTTON_BACKSPACE ];



//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_LBUTTON ]             = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_RBUTTON ]             = [ FUI.BUTTON_ ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_CANCEL ]              = [ FUI.BUTTON_PAUSE_BREAK ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_MBUTTON ]             = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_XBUTTON1 ]            = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_XBUTTON2 ]            = [ FUI.BUTTON_ ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_BACK ]                = [ FUI.BUTTON_BACKSPACE ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_TAB ]                 = [ FUI.BUTTON_TAB ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_CLEAR ]               = [ FUI.BUTTON_CLEAR ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_RETURN ]              = [ FUI.BUTTON_ENTER ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_SHIFT ]               = [ FUI.BUTTON_SHIFT ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_CONTROL ]             = [ FUI.BUTTON_CONTROL ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_MENU ]                = [ FUI.BUTTON_CONTEXT_MENU ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_PAUSE ]               = [ FUI.BUTTON_PAUSE_BREAK ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_CAPITAL ]             = [ FUI.BUTTON_CAPS_LOCK ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_KANA ]                = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_HANGUEL ]             = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_HANGUL ]              = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_JUNJA ]               = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_FINAL ]               = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_HANJA ]               = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_KANJI ]               = [ FUI.BUTTON_ ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_ESCAPE ]              = [ FUI.BUTTON_ESCAPE ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_CONVERT ]             = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_NONCONVERT ]          = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_ACCEPT ]              = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_MODECHANGE ]          = [ FUI.BUTTON_ ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_SPACE ]               = [ FUI.BUTTON_SPACE ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_PRIOR ]               = [ FUI.BUTTON_PAGE_UP ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_NEXT ]                = [ FUI.BUTTON_PAGE_DOWN ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_END ]                 = [ FUI.BUTTON_END ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_HOME ]                = [ FUI.BUTTON_HOME ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_LEFT ]                = [ FUI.BUTTON_ARROW_LEFT ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_UP ]                  = [ FUI.BUTTON_ARROW_UP ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_RIGHT ]               = [ FUI.BUTTON_ARROW_RIGHT ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_DOWN ]                = [ FUI.BUTTON_ARROW_DOWN ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_SELECT ]              = [ FUI.BUTTON_SELECT ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_PRINT ]               = [ FUI.BUTTON_ ]; //?
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_EXECUTE ]             = [ FUI.BUTTON_EXECUTE ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_SNAPSHOT ]            = [ FUI.BUTTON_PRINT_SCREEN ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_INSERT ]              = [ FUI.BUTTON_INSERT ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_DELETE ]              = [ FUI.BUTTON_DELETE ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_HELP ]                = [ FUI.BUTTON_HELP ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_0 ]                   = [ FUI.BUTTON_DIGIT_ZERO ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_1 ]                   = [ FUI.BUTTON_DIGIT_ONE ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_2 ]                   = [ FUI.BUTTON_DIGIT_TWO ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_3 ]                   = [ FUI.BUTTON_DIGIT_THREE ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_4 ]                   = [ FUI.BUTTON_DIGIT_FOUR ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_5 ]                   = [ FUI.BUTTON_DIGIT_FIVE ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_6 ]                   = [ FUI.BUTTON_DIGIT_SIX ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_7 ]                   = [ FUI.BUTTON_DIGIT_SEVEN ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_8 ]                   = [ FUI.BUTTON_DIGIT_EIGHT ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_9 ]                   = [ FUI.BUTTON_DIGIT_NINE ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_A ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_A ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_B ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_B ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_C ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_C ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_D ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_D ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_E ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_E ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_F ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_G ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_G ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_H ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_H ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_I ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_I ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_J ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_J ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_K ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_K ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_L ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_L ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_M ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_M ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_N ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_N ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_O ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_O ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_P ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_P ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_Q ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_Q ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_R ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_R ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_S ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_S ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_T ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_T ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_U ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_U ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_V ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_V ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_W ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_W ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_X ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_X ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_Y ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_Y ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_Z ]                   = [ FUI.BUTTON_LATIN_CAPITAL_LETTER_Z ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_OS_LEFT ]             = [ FUI.BUTTON_OS ]; // LWIN
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_OS_RIGHT ]            = [ FUI.BUTTON_OS ]; // RWIN
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_APPS ]                = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_SLEEP ]               = [ FUI.BUTTON_ ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_NUMPAD0 ]             = [ FUI.BUTTON_NUMPAD_0 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_NUMPAD1 ]             = [ FUI.BUTTON_NUMPAD_1 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_NUMPAD2 ]             = [ FUI.BUTTON_NUMPAD_2 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_NUMPAD3 ]             = [ FUI.BUTTON_NUMPAD_3 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_NUMPAD4 ]             = [ FUI.BUTTON_NUMPAD_4 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_NUMPAD5 ]             = [ FUI.BUTTON_NUMPAD_5 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_NUMPAD6 ]             = [ FUI.BUTTON_NUMPAD_6 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_NUMPAD7 ]             = [ FUI.BUTTON_NUMPAD_7 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_NUMPAD8 ]             = [ FUI.BUTTON_NUMPAD_8 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_NUMPAD9 ]             = [ FUI.BUTTON_NUMPAD_9 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_MULTIPLY ]            = [ FUI.BUTTON_NUMPAD_MULTIPLY ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_ADD ]                 = [ FUI.BUTTON_NUMPAD_ADD ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_SEPARATOR ]           = [ FUI.BUTTON_SEPARATOR ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_SUBTRACT ]            = [ FUI.BUTTON_NUMPAD_SUBTRACT ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_DECIMAL ]             = [ FUI.BUTTON_SEPARATOR ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_DIVIDE ]              = [ FUI.BUTTON_NUMPAD_DIVIDE ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F1 ]                  = [ FUI.BUTTON_F1 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F2 ]                  = [ FUI.BUTTON_F2 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F3 ]                  = [ FUI.BUTTON_F3 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F4 ]                  = [ FUI.BUTTON_F4 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F5 ]                  = [ FUI.BUTTON_F5 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F6 ]                  = [ FUI.BUTTON_F6 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F7 ]                  = [ FUI.BUTTON_F7 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F8 ]                  = [ FUI.BUTTON_F8 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F9 ]                  = [ FUI.BUTTON_F9 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F10 ]                 = [ FUI.BUTTON_F10 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F11 ]                 = [ FUI.BUTTON_F11 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F12 ]                 = [ FUI.BUTTON_F12 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F13 ]                 = [ FUI.BUTTON_F13 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F14 ]                 = [ FUI.BUTTON_F14 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F15 ]                 = [ FUI.BUTTON_F15 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F16 ]                 = [ FUI.BUTTON_F16 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F17 ]                 = [ FUI.BUTTON_F17 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F18 ]                 = [ FUI.BUTTON_F18 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F19 ]                 = [ FUI.BUTTON_F19 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F20 ]                 = [ FUI.BUTTON_F20 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F21 ]                 = [ FUI.BUTTON_F21 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F22 ]                 = [ FUI.BUTTON_F22 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F23 ]                 = [ FUI.BUTTON_F23 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_F24 ]                 = [ FUI.BUTTON_F24 ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_NUMLOCK ]             = [ FUI.BUTTON_NUMBER_LOCK ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_SCROLL ]              = [ FUI.BUTTON_SCROLL_LOCK ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_LSHIFT ]              = [ FUI.BUTTON_SHIFT ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_RSHIFT ]              = [ FUI.BUTTON_SHIFT ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_LCONTROL ]            = [ FUI.BUTTON_CONTROL ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_RCONTROL ]            = [ FUI.BUTTON_CONTROL ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_LMENU ]               = [ FUI.BUTTON_CONTEXT_MENU ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_RMENU ]               = [ FUI.BUTTON_CONTEXT_MENU ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_BROWSER_BACK ]        = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_BROWSER_FORWARD ]     = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_BROWSER_REFRESH ]     = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_BROWSER_STOP ]        = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_BROWSER_SEARCH ]      = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_BROWSER_FAVORITES ]   = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_BROWSER_HOME ]        = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_VOLUME_MUTE ]         = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_VOLUME_DOWN ]         = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_VOLUME_UP ]           = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_MEDIA_NEXT_TRACK ]    = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_MEDIA_PREV_TRACK ]    = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_MEDIA_STOP ]          = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_MEDIA_PLAY_PAUSE ]    = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_LAUNCH_MAIL ]         = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_LAUNCH_MEDIA_SELECT ] = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_LAUNCH_APP1 ]         = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_LAUNCH_APP2 ]         = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_PROCESSKEY ]          = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_ATTN ]                = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_CRSEL ]               = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_EXSEL ]               = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_EREOF ]               = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_PLAY ]                = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_ZOOM ]                = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_NONAME ]              = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_PA1 ]                 = [ FUI.BUTTON_ ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_OEM_CLEAR ]           = [ FUI.BUTTON_CLEAR ];
// for US keyboards, this is the most likely area for changes
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_OEM_PLUS ]            = [ FUI.BUTTON_PLUS_SIGN ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_OEM_COMMA ]           = [ FUI.BUTTON_COMMA ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_OEM_MINUS ]           = [ FUI.BUTTON_HYPHEN_MINUS ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_OEM_PERIOD ]          = [ FUI.BUTTON_PERIOD ];
// but mostly this section:
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_OEM_1 ]               = [ FUI.BUTTON_SEMICOLON ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_OEM_2 ]               = [ FUI.BUTTON_SOLIDUS ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_OEM_3 ]               = [ FUI.BUTTON_GRAVE_ACCENT ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_OEM_4 ]               = [ FUI.BUTTON_LEFT_SQUARE_BRACKET ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_OEM_5 ]               = [ FUI.BUTTON_REVERSE_SOLIDUS ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_OEM_6 ]               = [ FUI.BUTTON_RIGHT_SQUARE_BRACKET ];
FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_OEM_7 ]               = [ FUI.BUTTON_APOSTROPHE ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_OEM_8 ]               = [ FUI.BUTTON_ ];
//FUI.driver.keyboard.prototype.buttonTable[ FUI.driver.physicalKeys.BUTTON_OEM_102 ]             = [ FUI.BUTTON_ ];

// add in extras not found otherwise
// firefox
FUI.driver.keyboard.prototype.buttonTable[ 0x3B ]               = [ FUI.BUTTON_SEMICOLON ];
FUI.driver.keyboard.prototype.buttonTable[ 0x3D ]               = [ FUI.BUTTON_EQUALS_SIGN ];
FUI.driver.keyboard.prototype.buttonTable[ 0xAD ]               = [ FUI.BUTTON_HYPHEN_MINUS ]; // BUTTON_VOLUME_MUTE odd


// And define for all string values returned by WebKit (see https://trac.webkit.org/browser/trunk/Source/WebKit/chromium/src/WebInputEvent.cpp)
// TODO kindof a redefinition of what lies above, perhaps instead translate from string to physical key and then proceed as normal?
FUI.driver.keyboard.prototype.buttonTable[ "Alt" ]         = [ FUI.BUTTON_ALT ];
FUI.driver.keyboard.prototype.buttonTable[ "Control" ]     = [ FUI.BUTTON_CONTROL ];
FUI.driver.keyboard.prototype.buttonTable[ "Shift" ]       = [ FUI.BUTTON_SHIFT ];
FUI.driver.keyboard.prototype.buttonTable[ "CapsLock" ]    = [ FUI.BUTTON_CAPS_LOCK ];
FUI.driver.keyboard.prototype.buttonTable[ "Win" ]         = [ FUI.BUTTON_OS ];
FUI.driver.keyboard.prototype.buttonTable[ "Clear" ]       = [ FUI.BUTTON_CLEAR ];
FUI.driver.keyboard.prototype.buttonTable[ "Down" ]        = [ FUI.BUTTON_ARROW_DOWN ];
FUI.driver.keyboard.prototype.buttonTable[ "End" ]         = [ FUI.BUTTON_END ];
FUI.driver.keyboard.prototype.buttonTable[ "Enter" ]       = [ FUI.BUTTON_ENTER ];
FUI.driver.keyboard.prototype.buttonTable[ "Execute" ]     = [ FUI.BUTTON_EXECUTE ];
FUI.driver.keyboard.prototype.buttonTable[ "F1" ]          = [ FUI.BUTTON_F1  ];
FUI.driver.keyboard.prototype.buttonTable[ "F2" ]          = [ FUI.BUTTON_F2  ];
FUI.driver.keyboard.prototype.buttonTable[ "F3" ]          = [ FUI.BUTTON_F3  ];
FUI.driver.keyboard.prototype.buttonTable[ "F4" ]          = [ FUI.BUTTON_F4  ];
FUI.driver.keyboard.prototype.buttonTable[ "F5" ]          = [ FUI.BUTTON_F5  ];
FUI.driver.keyboard.prototype.buttonTable[ "F6" ]          = [ FUI.BUTTON_F6  ];
FUI.driver.keyboard.prototype.buttonTable[ "F7" ]          = [ FUI.BUTTON_F7  ];
FUI.driver.keyboard.prototype.buttonTable[ "F8" ]          = [ FUI.BUTTON_F8  ];
FUI.driver.keyboard.prototype.buttonTable[ "F9" ]          = [ FUI.BUTTON_F9  ];
FUI.driver.keyboard.prototype.buttonTable[ "F10" ]         = [ FUI.BUTTON_F10 ];
FUI.driver.keyboard.prototype.buttonTable[ "F11" ]         = [ FUI.BUTTON_F11 ];
FUI.driver.keyboard.prototype.buttonTable[ "F12" ]         = [ FUI.BUTTON_F12 ];
FUI.driver.keyboard.prototype.buttonTable[ "F13" ]         = [ FUI.BUTTON_F13 ];
FUI.driver.keyboard.prototype.buttonTable[ "F14" ]         = [ FUI.BUTTON_F14 ];
FUI.driver.keyboard.prototype.buttonTable[ "F15" ]         = [ FUI.BUTTON_F15 ];
FUI.driver.keyboard.prototype.buttonTable[ "F16" ]         = [ FUI.BUTTON_F16 ];
FUI.driver.keyboard.prototype.buttonTable[ "F17" ]         = [ FUI.BUTTON_F17 ];
FUI.driver.keyboard.prototype.buttonTable[ "F18" ]         = [ FUI.BUTTON_F18 ];
FUI.driver.keyboard.prototype.buttonTable[ "F19" ]         = [ FUI.BUTTON_F19 ];
FUI.driver.keyboard.prototype.buttonTable[ "F20" ]         = [ FUI.BUTTON_F20 ];
FUI.driver.keyboard.prototype.buttonTable[ "F21" ]         = [ FUI.BUTTON_F21 ];
FUI.driver.keyboard.prototype.buttonTable[ "F22" ]         = [ FUI.BUTTON_F22 ];
FUI.driver.keyboard.prototype.buttonTable[ "F23" ]         = [ FUI.BUTTON_F23 ];
FUI.driver.keyboard.prototype.buttonTable[ "F24" ]         = [ FUI.BUTTON_F24 ];
FUI.driver.keyboard.prototype.buttonTable[ "Help" ]        = [ FUI.BUTTON_HELP ];
FUI.driver.keyboard.prototype.buttonTable[ "Home" ]        = [ FUI.BUTTON_HOME ];
FUI.driver.keyboard.prototype.buttonTable[ "Insert" ]      = [ FUI.BUTTON_INSERT ];
FUI.driver.keyboard.prototype.buttonTable[ "Left" ]        = [ FUI.BUTTON_ARROW_LEFT ];
FUI.driver.keyboard.prototype.buttonTable[ "PageDown" ]    = [ FUI.BUTTON_PAGE_DOWN ];
FUI.driver.keyboard.prototype.buttonTable[ "PageUp" ]      = [ FUI.BUTTON_PAGE_UP ];
FUI.driver.keyboard.prototype.buttonTable[ "Pause" ]       = [ FUI.BUTTON_PAUSE_BREAK ];
FUI.driver.keyboard.prototype.buttonTable[ "PrintScreen" ] = [ FUI.BUTTON_PRINT_SCREEN ];
FUI.driver.keyboard.prototype.buttonTable[ "Right" ]       = [ FUI.BUTTON_ARROW_RIGHT ];
FUI.driver.keyboard.prototype.buttonTable[ "Scroll" ]      = [ FUI.BUTTON_SCROLL_LOCK ];
FUI.driver.keyboard.prototype.buttonTable[ "Select" ]      = [ FUI.BUTTON_SELECT ];
FUI.driver.keyboard.prototype.buttonTable[ "Up" ]          = [ FUI.BUTTON_ARROW_UP ];
/* // not recognized as not reported by browsers tested
FUI.driver.keyboard.prototype.buttonTable[ "MediaNextTrack" ] = [ FUI.BUTTON_"MediaNextTrack" ];
FUI.driver.keyboard.prototype.buttonTable[ "MediaPreviousTrack" ] = [ FUI.BUTTON_"MediaPreviousTrack" ];
FUI.driver.keyboard.prototype.buttonTable[ "MediaStop" ] = [ FUI.BUTTON_"MediaStop" ];
FUI.driver.keyboard.prototype.buttonTable[ "MediaPlayPause" ] = [ FUI.BUTTON_"MediaPlayPause" ];
FUI.driver.keyboard.prototype.buttonTable[ "VolumeMute" ] = [ FUI.BUTTON_"VolumeMute" ];
FUI.driver.keyboard.prototype.buttonTable[ "VolumeDown" ] = [ FUI.BUTTON_"VolumeDown" ];
FUI.driver.keyboard.prototype.buttonTable[ "VolumeUp" ] = [ FUI.BUTTON_"VolumeUp" ];
//*/