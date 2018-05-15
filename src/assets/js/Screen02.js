import G from './gloable';
export default function Screen02(stage,queue){
	this.stage = stage;
	this.queue = queue;
	this.container = new createjs.Container();
	this._init();
}

Screen02.prototype._init = function(){
	G.screenLocked = 2;

	
	createjs.Tween.get(this.stage)
	.wait(1500)
	.to({
		y: -595 
	},3500);
	


	//月亮
	this._showMoon();

	//城墙
	this._showBlock();

	//云朵
	this._showCloud();

	//girl女神
	this._girlAnimation();

	this.stage.addChild(this.container);

	
}

Screen02.prototype._showText = function(){
	return new Promise((resolve,reject)=>{
		this.text01 = new createjs.Bitmap(this.queue.getResult('02_text01'));
		this.text01.alpha = 0;
		this.text01.x = 230;
		this.text01.y = 730;
		createjs.Tween.get(this.text01)
		.wait(500)
		.to({
			x: 250,
			alpha: 1
		},1500,createjs.Ease.getPowIn(2.2));

		this.text02 = new createjs.Bitmap(this.queue.getResult('02_text02'));
		this.text02.alpha = 0;
		this.text02.x = 320;
		this.text02.y = 750;
		createjs.Tween.get(this.text02)
		.wait(2000)
		.to({
			x: 350,
			alpha: 1
		},1500,createjs.Ease.getPowIn(2.2))
		.call(()=>{
			resolve();
		});
		this.container.addChild(this.text01,this.text02);
	});
	
}


Screen02.prototype._showMoon = function(){
	this.moon = new createjs.Bitmap(this.queue.getResult('02_moon'));
	this.moon.x = 860;
	this.moon.y = 585;
	this.container.addChild(this.moon);
}

Screen02.prototype._showBlock = function(){
	this.block01 = new createjs.Bitmap(this.queue.getResult('02_block01'));
	this.block01.x = -70;
	this.block01.y = 1055;

	this.block02 = new createjs.Bitmap(this.queue.getResult('02_block02'));
	this.block02.x = 570;
	this.block02.y = 1055;

	this.block03 = new createjs.Bitmap(this.queue.getResult('02_block03'));
	this.block03.x = 636;
	this.block03.y = 1055;

	this.block04 = new createjs.Bitmap(this.queue.getResult('02_block04'));
	this.block04.x = 830;
	this.block04.y = 900;

	this.container.addChild(this.block01,this.block02,this.block03,this.block04);
}


Screen02.prototype._showCloud = function(){
	this.cloud01 = new createjs.Bitmap(this.queue.getResult('02_cloud01'));
	this.cloud01.x = 15;
	this.cloud01.y = 1065;

	this.cloud02 = new createjs.Bitmap(this.queue.getResult('02_cloud02'));
	this.cloud02.x = 100;
	this.cloud02.y = 1065;

	this.cloud03 = new createjs.Bitmap(this.queue.getResult('02_cloud03'));
	this.cloud03.x = 200;
	this.cloud03.y = 1065;

	this.cloud04 = new createjs.Bitmap(this.queue.getResult('02_cloud04'));
	this.cloud04.x = 300;
	this.cloud04.y = 1065;

	this.container.addChild(this.cloud01,this.cloud02,this.cloud03,this.cloud04);
}

Screen02.prototype._button = function(){
	this.optipbtn = new createjs.Bitmap(this.queue.getResult('screen_optipbtn'));
	this.optipbtn.x = 1015;
	this.optipbtn.y = 1015;

	this.optipcircle = new createjs.Bitmap(this.queue.getResult('screen_optipcircle'));
	this.optipcircle.x = 1050;
	this.optipcircle.y = 1050;
	this.optipcircle.regX = 35;
	this.optipcircle.regY = 35;
	createjs.Tween.get(this.optipcircle,{loop:true})
	.to({
		alpha: 0,
		scaleX: 1.5,
		scaleY: 1.5
	},1500);

	this.optipbtn.addEventListener('click', ()=>{
		//按钮消失
		this.container.removeChild(this.optipbtn);
		this.container.removeChild(this.optipcircle);

		//文字消失
		new Promise((resolve,reject)=>{
			//文字一消失动画
			createjs.Tween.get(this.text01)
			.to({
				x: 230,
				alpha: 0
			})
			.call(()=>{
				resolve();
			})
		})
		.then(()=>{
			//文字二消失动画
			return new Promise((resolve,reject)=>{
				createjs.Tween.get(this.text02)
				.to({
					x: 320,
					alpha: 0
				})
				.call(()=>{
					resolve();
				});
			});
		})
		.then(()=>{
			//背景抖动
			return new Promise((resolve,reject)=>{
				let count = 0;
				var bgAni = new createjs.Tween.get(this.stage,{loop:6})
				.to({
					x: -5,
					y: -600
				},200,createjs.Ease.getPowIn(2.2))
				.call(()=>{
					if(count === 6){
						bgAni.pause();
						resolve();
					}
					createjs.Tween.get(this.stage)
					.to({
						x: 0,
						y: -595
					},200,createjs.Ease.getPowIn(2.2));

					count++;
				});
			});
		})
		.then(()=>{
			//stage背景移动
			createjs.Tween.get(this.stage)
			.to({
				y:-1810
			},7000);

			//墙体砖块掉落
			createjs.Tween.get(this.block02)
			.to({
				y:1160,
				alpha:0
			},2000);

			createjs.Tween.get(this.block03)
			.to({
				y:1500,
				rotation:-30
			},2000)
			.call(()=>{
				createjs.Tween.get(this.block03)
				.to({y:1550,alpha:0},2000)
			});

			//云彩、人物坠落
			this.girlCloud = new createjs.Bitmap(this.queue.getResult('02_cloud01'));
			this.girlCloud.x = 630;
			this.girlCloud.y = 1030;
			this.girlCloud.scaleX = .2;
			this.girlCloud.scaleY = .2;
			this.girlCloud.alpha = .8;
			createjs.Tween.get(this.girlCloud)
			.to({
				y:2312
			},10000)
			.call(()=>{
				createjs.Tween.get(this.girlCloud)
				.to({
					alpha:0
				},200)
				.call(()=>{
					this.container.removeChild(this.girlCloud);

					//将场景控制值设置为 场景三
					G.screen = 3;
				});
			});
			this.container.addChild(this.girlCloud);

			createjs.Tween.get(this.girlAnimate)
			.to({
				y:2250
			},10000);
		});
	});

	this.container.addChild(this.optipbtn,this.optipcircle);

}

Screen02.prototype._girlAnimation = function(){
	createjs.Ticker.setFPS(10);
	let girlSprite = new createjs.SpriteSheet({
		images: [this.queue.getResult('02_girl')],
		frames: {
			width: 135,
			height:100,
			count: 48
		},
		animations: {
			stand: [0,20],
			walk: [21,36],
			run: [37,47]
		}
	});

	this.girlAnimate = new createjs.Sprite(girlSprite, 'walk');
	this.girlAnimate.x = 500;
	this.girlAnimate.y = 968;

	this.container.setChildIndex(this.girlAnimate,10);
	this.stage.setChildIndex(this.container,10);

	new Promise((resolve,reject)=>{
		createjs.Tween.get(this.girlAnimate)
		.wait(6500)
		.to({
			x: 600
		},5000)
		.call(()=>{
			this.girlAnimate.gotoAndPlay('stand');
			resolve();
		});
	})
	.then(()=>{
		//文字
		return this._showText();
	})
	.then(()=>{
		let timmer = setTimeout(()=>{
			//按钮
			this._button();
			clearTimeout(timmer);
		},1000);
		
	});

	this.container.addChild(this.girlAnimate);

}