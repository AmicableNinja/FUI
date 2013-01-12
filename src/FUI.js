/**
 * @author AmicableNinja / https://github.com/AmicableNinja/
 */

var FUI = FUI || { revision : 1 };

// CONSTANTS

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

// TODO add other standard UTF characters found on keyboards (oh, to have a non us-en board...ebay? ;)




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