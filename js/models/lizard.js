$.Lizard = (function(shape){
	function L(v){
		this.vectors = v;
		this.x = this.vectors.origin.x;
		this.y = this.vectors.origin.y;
		this.health = 3;
		this.speed = v.speed;
		this.maxHealth = 5;
		this.calculateDirection(this.vectors);
		this.width = 100;
		this.height = 44;
		this.frame = 0;
		this.spriteName = "lizard";
		this.ibh = 0;
		this.isD = 0;
		this.sprite = $.Sprite.getSprite(this.spriteName ,this.frame);
		this.eb = new $.EnergyBar(this);
		var self = this;
		var interval = setInterval(function(){
			if(!self.ibh && !self.isD){
				self.frame += 1;
				if(self.frame == 4){
					self.frame = 0;
				}
			}
		},100);
	}
	L.prototype = Object.create(shape.prototype);
	L.prototype.move = function(){
		this.sprite = $.Sprite.getSprite(this.spriteName ,{x : !this.frame ? 0 : (this.width * this.frame) , y : 0});
		if(this.isD || this.ibh) return;
		this.x += this.vx;
		this.eb.move(this);
	}
	L.prototype.hurt = function(){
		if(!this.ibh && !this.isD){
			var self = this;
			this.ah();
			self.health-=1;
		}
	}

	L.prototype.ah = function(cb){
		var self = this, frameStored = this.frame;
		this.ibh = 1;
		this.frame = 0;
		this.spriteName = "lizard_hurts";
		setTimeout(function(){
			self.spriteName = "lizard";
			self.frame = 0;
			self.ibh = 0;
			if(cb)cb();
		},300);
	}

	L.prototype.ad = function(cb){
		if(!this.ibh && !this.isD){
			var self = this;
			this.spriteName = "lizard_dead";
			this.isD = 1;
			this.frame = 0;
			var interval = setInterval(function(){
				self.frame+=1;
				if(self.frame >= 2){
					self.frame = 0;
					clearInterval(interval);
					if(cb)cb();
				}
			},200);
		}
	}

	L.prototype.isAlive = function(){
		return this.health > 1;
	}

	L.prototype.draw = function(ctx,speed){
		  this.speed = speed;
		  this.move();
		  ctx.drawImage(this.sprite.image, 
				this.sprite.pos.x, 
				this.sprite.pos.y, 
				this.width,
           		this.height,
				this.x, 
				this.y,
				this.width,
           		this.height);
		  this.eb.draw(ctx,this.health);
	}

	return L;
})($.Shape);