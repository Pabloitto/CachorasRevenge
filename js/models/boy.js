$.Boy = (function (shape) {

	function B(pX , pY) {
		var _ = this;
		_.x = 10;
		_.y = pY / 2;
		_.health = 5;
		_.rocks = [];
		_.spd = 15;
		_.angle = 0;
		_.frame = 0;
		_.underFire = 0;
		_.cH=pY;
		_.cW=pX;
		_.height = 64;
		_.width = 40;
		_.spriteName = "boy";
		_.frame = 0;
		_.eb = new $.EnergyBar(_);
	}

	B.prototype = Object.create(shape.prototype);

	B.prototype.shot = function(e){
		var self = this,
			rock = new $.Rock({
			origin : {x : this.x + (this.width / 2) , y : this.y + (this.height / 2)},
			target : {x : e.x < 200 ? 200 : e.x, y : e.y}
		},{
			height: this.cH,
			width : this.cW,
			removeRockFromCanvas : function(r){
				var index = self.rocks.indexOf(r);
				if(index > -1){
					self.rocks.splice(index,1);
				}
			}
		});

		if(this.rocks.length < 1){
			this.rocks.push(rock);
		}
	};

	B.prototype.getSprite = function(){
		return $.Sprite.getSprite(this.spriteName,{x : !this.frame ? 0 : (this.width * this.frame) , y : 0});
	};

	B.prototype.move = function(k){
		if (k[$.KC.UP]) if(this.y > 0) this.y -= this.spd;

	    if (k[$.KC.DOWN]) if(this.y < (this.cH - this.height - 10)) this.y += this.spd;
	    
	    this.eb.move(this);
	};

	B.prototype.isAlive = function(){
		return this.health > 0;
	};

	B.prototype.draw = function(ctx){
		var sprite = this.getSprite();
		ctx.drawImage(sprite.image, 
		        sprite.pos.x, 
				sprite.pos.y, 
				this.width,
           		this.height,
				this.x, 
				this.y,
				this.width,
           		this.height);
		this.eb.draw(ctx,this.health);
    }
	
	return B;
})($.Shape);