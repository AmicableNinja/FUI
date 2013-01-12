fuiAdapter.js

To simplify Physical User Interface interaction.
Designed in conjunction with a browser-CAD project.

Hopeful Usage:
```javascript
this.fuiAdapter = new FUI.adapter();
this.fuiAdapter.listenOn( this.DOMElement )
               .listenUsing( FUI.drivers.firefox )
               .listenFor( states, callbackFunction )
               .listenFor( ["pointerDown", "A"], this.callback_downAndA )
               .listenFor(
		           new FUI.gesture()
		                   .pointer().move()
		                   .and()
		                   .button( FUI.BUTTON_CONTROL ).stillDown()
		                   .or()
		                   .button( FUI.BUTTON_SHIFT ).down(),
		           function (event) { console.log("custom event fired", event); }
		       )
               .listenFor( 
```

Intended data structure for events:
```javascript
{
	pointers : [{}], // mouse and touches
	buttons  : {},   // any hardware buttons, typically(&currently) just the keyboard
	hardware : {
		mouse    : {},
		keyboard : {},
		touches  : [{}]
	},
	rawEventData : {}
}
```

TODO:
* implement Pointer Lock (https://developer.mozilla.org/en-US/docs/API/Pointer_Lock_API)

Possible to use traditional events too?
Envisioned events:
* Pointers:
	* up
	* down
	* move
	* moveWhileUp
	* moveWhileDown
	* gesture
	* gestureZoom (etc)
* Buttons
	* up
	* down
	* stillDown
	

Resources consulted:
* http://unicodetable.org/
* http://en.wikipedia.org/wiki/Control_character
* http://en.wikipedia.org/wiki/ASCII#ASCII_control_characters
* http://en.wikipedia.org/wiki/Device_Control_1#Device_Control
* http://en.wikipedia.org/wiki/Cancel_character
* http://www.fileformat.info/info/unicode/char/94/index.htm
* https://trac.webkit.org/browser/trunk/Source/WebKit/chromium/src/WebInputEvent.cpp
* http://msdn.microsoft.com/en-us/library/ms927178.aspx