FUI.adapter_mouse = function () {
	
	this.currentState = {};
	//TODO
};

FUI.adapter_mouse.prototype.getPointer = function () {
	//TODO
	/*
	return {
		pointer : this.currentState.pointer ?
			{
				x : this.currentState.pointer.x,
				y : this.currentState.pointer.y
			} : false,
		buttons : this.currentState.buttons ?  
			{
				left   : false,
				right  : false,
				middle : false
			} : false
	};//*/
	return this.currentState;
};

FUI.adapter_mouse.prototype.fromData = function ( data ) {
	
	FUI.debug.log( 10, ["data is", data] );
	for ( var n in data.buttons ) {
		if( data.buttons[n] ) {
			this.down( n );
		} else {
			this.up( n );
		}
	}
	
	if( data.pointer ){
		this.move( data.pointer.x, data.pointer.y, data.pointer.z );
	}
};

FUI.adapter_mouse.prototype.down = function ( button ) {
	this.currentState.buttons = this.currentState.buttons || {};
	this.currentState.buttons[button] = true;
};

FUI.adapter_mouse.prototype.up = function ( button ) {
	this.currentState.buttons = this.currentState.buttons || {};
	//TODO above line needed?
	this.currentState.buttons[button] = false;
};

FUI.adapter_mouse.prototype.move = function ( newX, newY, dZ ) {
	
	this.currentState.pointer = this.currentState.pointer || {};
	this.currentState.pointer.x = newX;
	this.currentState.pointer.y = newY;
	if (dZ) {
		this.currentState.pointer.dz = dZ;
	}
	 
};