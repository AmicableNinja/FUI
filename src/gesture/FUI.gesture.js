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