$.Shape = (function () {

	function Shape() {}
	
	Shape.prototype.speed = 1;
	Shape.prototype.x = 10;
	Shape.prototype.y = 10;
	Shape.prototype.width = 32;
	Shape.prototype.height = 32;
	Shape.prototype.vy = 0;
	Shape.prototype.vx = 0;
	Shape.prototype.id = '';

	Shape.prototype.calculateAngle = function(xTarget , yTarget){
		return Math.atan2(yTarget - this.y, xTarget - this.x) * 180 / Math.PI;
	}
	
	Shape.prototype.calculateDirection = function(vectors){
		var angle = this.calculateAngle(vectors.target.x,vectors.target.y),
			radians = angle * Math.PI/ 180;
		this.vx = Math.cos(radians) * this.speed;
	    this.vy = Math.sin(radians) * this.speed;
	}
	
	return Shape;
})();