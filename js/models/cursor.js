$.Cursor = (function (shape) {
	function Cursor() {
		this.x = 200;
	}
	Cursor.prototype = Object.create(shape.prototype);

	Cursor.prototype.move = function(e){
		if(e.x > 200) this.x = e.x;
		this.y = e.y;
	};
	
	Cursor.prototype.getImage = function(){
		return $.ImageFactory.getImg('pointer');
	};

	return Cursor;
	
})($.Shape);