import G from './gloable';
export default function Screen04(stage,queue){
	this.stage = stage;
	this.queue = queue;
	this.girlAnimate = G.girlAnimate;
	this.container = new createjs.Container();
	this.stage.addChild(this.container);
	this._init();
}

Screen04.prototype._init = function(){
	G.screenLocked = 4;

	this._bg();

	this._showText()
	.then(()=>{
		this._button();
	})
}


Screen04.prototype._bg = function(){
	//移除最开始的背景
	createjs.Tween.get(G.bg)
	.to({
		alpha: 0
	}, 2000)
	.call(()=>{
		this.stage.removeChild(G.bg);
	});

	
	this.groundBg = new createjs.Bitmap(this.queue.getResult('05_ground_bg'));
	this.groundBg.y = 1810;


	this.ground = new createjs.Bitmap(this.queue.getResult('05_ground'));
	this.ground.y = 1810;
	createjs.Tween.get(this.ground)
	.to({
		x: -150
	}, 3000);

	this.container.addChild(this.groundBg,this.ground);

	G.girlAnimate.gotoAndPlay('walk');
	G.girlAnimate.x = 500;
	G.girlAnimate.y = 2250;

	createjs.Tween.get(G.girlAnimate)
	.to({
		x: 600
	},5500)
	.call(()=>{
		G.girlAnimate.gotoAndPlay('stand');
	});
	
	this.container.addChild(G.girlAnimate);

	
}



Screen04.prototype._showText = function(){
	return new Promise((resolve, reject)=>{
		this.text01 = new createjs.Bitmap(this.queue.getResult('05_text01'));
		this.text01.alpha = 0;
		this.text01.x = 230;
		this.text01.y = 1880;

		createjs.Tween.get(this.text01)
		.to({
			alpha: 1 
		}, 2500);

		this.text02 = new createjs.Bitmap(this.queue.getResult('05_text02'));
		this.text02.alpha = 0;
		this.text02.x = 390
		this.text02.y = 1960;
		createjs.Tween.get(this.text02)
		.to({
			x: 370,
			alpha: 1 
		}, 2500)
		.call(()=>{
			resolve();
		});

		this.container.addChild(this.text01, this.text02);
	});
	
}



Screen04.prototype._button = function(){
	this.optipbtn = new createjs.Bitmap(this.queue.getResult('screen_optipbtn'));
	this.optipbtn.x = 1050;
	this.optipbtn.y = 2200;

	this.optipcircle = new createjs.Bitmap(this.queue.getResult('screen_optipcircle'));
	this.optipcircle.x = 1085;
	this.optipcircle.y = 2235;
	this.optipcircle.regX = 35;
	this.optipcircle.regY = 35;
	createjs.Tween.get(this.optipcircle,{loop:true})
	.to({
		alpha: 0,
		scaleX: 1.5,
		scaleY: 1.5
	},1500);


	this.optipbtn.addEventListener('click', ()=>{
		//清除按钮 与 文字
		this.container.removeChild(this.optipbtn,this.optipcircle);
		createjs.Tween.get(this.text01)
		.to({
			alpha: 0 
		}, 1500);

		createjs.Tween.get(this.text02)
		.to({
			x: 390,
			alpha: 0 
		}, 1500);

		//人物跑的 动画
		G.girlAnimate.gotoAndPlay('run');
		createjs.Tween.get(G.girlAnimate)
		.to({
			x: 1400
		},5500)
		.call(()=>{
			//移除背景
			this.container.removeChild(this.groundBg,this.ground);
			G.screen = 5;
		});

	});

	this.container.addChild(this.optipbtn,this.optipcircle);
}