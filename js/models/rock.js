$.Rock = (function (shape) {
	var vectors = null;
	function Rock(v,canvas) {
		vectors = v;
		this.canvas = canvas;
		this.speed = 50;
		this.x = vectors.origin.x;
		this.y = vectors.origin.y;
		this.size = 4;
		this.calculateDirection(vectors);
	}
	Rock.prototype = Object.create(shape.prototype);
	Rock.prototype.move = function(){
		this.x += this.vx;
		this.y += this.vy;
		if(this.y >= this.canvas.height || this.y <= 0 || this.x <= 0 || this.x >= this.canvas.width){
			this.canvas.removeRockFromCanvas(this);
		}
	};
	Rock.prototype.draw = function(ctx){
		this.move();
	    ctx.arc(this.x,this.y,this.size,0,Math.PI * 2,true);
		ctx.closePath();
	}
	return Rock;

})($.Shape);