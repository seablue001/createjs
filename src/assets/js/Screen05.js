import G from './gloable';
export default function Screen05(stage,queue){
	this.stage = stage;
	this.queue = queue;
	this.girlAnimate = G.girlAnimate;
	this.container = new createjs.Container();
	this.stage.addChild(this.container);
	this._init();
}

Screen05.prototype._init = function(){
	G.screenLocked = 5;


	this.bg = new createjs.Bitmap(this.queue.getResult('06_bg'));
	this.bg.y = 1810;
	this.container.addChild(this.bg);

	new Promise((resolve,reject)=>{
		G.girlAnimate.x = 0;
		G.girlAnimate.y = 2250;
		G.girlAnimate.gotoAndPlay('run');
		createjs.Tween.get(G.girlAnimate)
		.to({
			x: 600
		},5500)
		.call(()=>{
			resolve();
			G.girlAnimate.gotoAndPlay('stand');
		});
		this.container.addChild(G.girlAnimate);
	})
	.then(()=>{
		//人物闪光
		this._girllights();

		let timmer = setTimeout(()=>{
			//文字
			this._showText();
			clearTimeout(timmer);
		},1000);
		
	});	

	
}

Screen05.prototype._girllights = function(){
	let girllightsSprite = new createjs.SpriteSheet({
		images: [this.queue.getResult('06_girllights')],
		frames: {
			width: 180,
			height: 150,
			count: 30
		},
		animations: {
			shining: [0,29]
		}
	});


	this.girllightsAnimate = new createjs.Sprite(girllightsSprite, 'shining'); 
	this.girllightsAnimate.x = 500;
	this.girllightsAnimate.y = 2200;

	this.container.addChild(this.girllightsAnimate);
}


Screen05.prototype._showText = function(){
	this.text01 = new createjs.Bitmap(this.queue.getResult('06_text01'));
	this.text01.x = 304;
	this.text01.y = 1980;
	this.text01.alpha = 0;
	createjs.Tween.get(this.text01)
	.to({
		y: 2000,
		alpha: 1
	},1000);

	this.text02 = new createjs.Bitmap(this.queue.getResult('06_text02'));
	this.text02.x = 525;
	this.text02.y = 2100;
	this.text02.alpha = 0;
	createjs.Tween.get(this.text02)
	.to({
		y: 2120,
		alpha: 1
	},1000);

	this.container.addChild(this.text01, this.text02);
}

Screen05.prototype._showMeteor = function(){

}
