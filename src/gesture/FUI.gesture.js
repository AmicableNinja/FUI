FUI.gesture = function () {
	
	this.conditions = [];
	
	this.__currentCondition = false;
	this.__currentCondition_index = false;
	
	return this;
};

FUI.gesture.prototype.__startNewCondition = function () {
	this.__currentCondition_index = this.conditions.push(this.__currentCondition = {});
	this.__currentCondition_index -= 1;
	FUI.debug.log( 10, ["currentCndition index", this.__currentCondition_index] );
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
		switch( typeof this.ors[n]) {
			case "object":
				if( this.ors[n].evaluate ){
					isTrue = this.ors[n].evaluate(data) || isTrue;
				}else{
					FUI.debug.error( 10, ["unknown object type, ors", this.ors[n], n, this.ors] );
				}
				break;
			case "undefined":
				return false;
				break;
			case "boolean":
				isTrue = this.ors[n] || isTrue;
				break;
			case "function":
				isTrue = this.ors[n](data) || isTrue;
				break;
			case "number":
			default:
				FUI.debug.error( 10, ["not implemented yet, ors", this.ors[n], n, this.ors] );
				break;
		}
		if( isTrue ){
			return true;
		}
	}
	
	for( var n in this.ands) {
		switch( typeof this.ands[n]) {
		case "object":
			if( this.ands[n].evaluate ){
				isTrue = this.ands[n].evaluate(data) && isTrue;
			}else{
				FUI.debug.error( 10, ["unknown object type, ands", this.ands[n], n, this.ands] );
			}
			break;
		case "undefined":
			return false;
			break;
		case "boolean":
			isTrue = this.ors[n] && isTrue;
			break;
		case "function":
			isTrue = this.ors[n](data) && isTrue;
			break;
		case "number":
		default:
			FUI.debug.error( 10, ["not implemented yet, ands", this.ands[n], n, this.ands] );
			break;
		}
	}
	
	return isTrue;
		
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