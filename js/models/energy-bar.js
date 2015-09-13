$.EnergyBar = (function (shape) {
	function EnergyBar(model) {
		this.x = model.x;
		this.y = model.y - (this.height * 4);
		this.width = (model.health) * 10;
		this.height = 5;
		this.strokeColor = "black";
		this.fillColor = "red";
	}
	
	EnergyBar.prototype = Object.create(shape.prototype);

	EnergyBar.prototype.move = function(model){
		this.x = model.x;
		this.y = model.y - (this.height * 4);
	};

	EnergyBar.prototype.draw = function(ctx,life,canIncrement){
	     ctx.beginPath();
	     ctx.strokeStyle = this.strokeColor;
	     ctx.rect(this.x,this.y, canIncrement ? (life || 1) * 10 : this.width,this.height);
	     ctx.stroke();
	     ctx.closePath();
	     
	     ctx.beginPath();
	     ctx.fillStyle = this.fillColor;
	     ctx.fillRect(this.x,this.y,(life || 1) * 10 ,this.height);
	     ctx.closePath();
    }

	return EnergyBar;
})($.Shape);