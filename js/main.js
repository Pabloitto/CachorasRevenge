(function(){
	$ = {};

	var c, ctx,cursor,fps =  60,mel,kel,l = [],gover = 0,s = 0,levels = [],cl,levelInterval,lInterval,boy
	,si = setInterval,
	 ci=clearInterval;

	function genLev(){
		var nl = 10;levels = [];
		for(var i = 0;i < nl;i++){
			levels.push({
				timeToGeneratel : 5000 + (i * 1000),
				lpeed : 5 + i,
				lToGenerate : 1 + i
			});
		}
	}

	function updatecl(){
		cl = levels.shift();
		levelInterval = si(function(){
			cl = levels.shift();
		},30000);
	}

	function repaint(){
		drawBG();
		if(!s){
			ctx.font="30px Arial";
			ctx.strokeText("Enter to start",(c.width+250)/3,c.height/2);
		}else if(!gover){
			if(!boy.isAlive()){
				gover = 1;
				s = 0;
				ci(lInterval);
				ci(levelInterval);
				initGame();
			}
			paintBoy();
			paintl();
			paintRocks();
		}
		ctx.drawImage(cursor.getImage(), cursor.x, cursor.y);
		setTimeout(repaint, fps);
	}

	function generatel(){
		var c = 0, n = cl.lToGenerate;
		while(c++ < n){
			var li = getLi();
			l.push(li);
		}
	}

	function getLi(){
		var rdmPositions = {
			x : c.width, 
			y : Math.floor(Math.random() * (c.height - c.height / 4))
		},
		tempEnemy = new $.Lizard({
			speed : cl.lpeed,
			origin : rdmPositions,
			target : {x : boy.x + (boy.width / 2) , y : boy.y + (boy.height / 2)}
		});

		return tempEnemy;
	}

	function paintBoy(){
		boy.move(kel.getKeys());
		boy.draw(ctx);
	}

	function paintRocks(){
		ctx.beginPath();
		for (var i = 0; i < boy.rocks.length; i++) {
			var collition = $.intersectWithArray(boy.rocks[i],l);
				li = collition.e;
			if(!li){
				boy.rocks[i].draw(ctx);
			}else{
				if(li.isAlive()){
					li.hurt();
				}else{
					l[collition.i].energyBar = null;
					li.ad(function(){
						l.splice(collition.i , 1);
					});
				}

				boy.rocks.splice(i,1);
			}
	    }
	    ctx.fill();
	}

	function paintl(){
		for (var i = 0; i < l.length; i++) {
			l[i].draw(ctx,cl.lpeed);
			if(l[i].x < 200) {
				boy.health -= 0.5;
				l.splice(i , 1);
			}
		}
	}

	function initGame(){
		l = [];
		genLev();
		updatecl();
		c = document.getElementById("c");
		c.height = 600;
		c.width = 1000;
		cursor = new $.Cursor();
		boy = new $.Boy(c.width, c.height);
		ctx = c.getContext('2d');
		generatel();
		lInterval = si(function(){
			generatel();
		},cl.timeToGeneratel);
		bindEvents();
	}

	function init(){
		initGame();
		repaint();
	}

	function bindEvents(){

		kel = new $.kel({
			element : document,
		 	start : function(){s = 1;gover = 0;}
		});

		mel = new $.mel({
			element : c,
			onMouseMove : onMouseMove,
			onClick : function(x,y,button){
				boy.shot({ x : x , y : y});
			}
		});
	}

	function drawBG(){
		ctx.fillStyle = 'green';
		ctx.fillRect(0,0,c.width, c.height);
	}

	function onMouseMove(x,y){
		cursor.move({ x : x , y : y});
	}
	$.init = init;
}());