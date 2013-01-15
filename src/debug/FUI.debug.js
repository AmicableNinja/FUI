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