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
//only took the minified version down ~9kb (from 37.206 kb to 28,644 bytes) :S
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