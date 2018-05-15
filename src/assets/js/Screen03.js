import G from './gloable';
export default function Screen03(stage,queue){
	this.stage = stage;
	this.queue = queue;
	this.container = new createjs.Container();
	this.stage.addChild(this.container);
	this._init();
}

Screen03.prototype._init = function(){
	G.screenLocked = 3;
	//light 光
	this._light();

	//提示文字
	this._showText()
	.then(()=>{
		//操作按钮
		this._button();
	});

}


Screen03.prototype._showText = function(){
	return new Promise((resolve, reject)=>{
		this.text01 = new createjs.Bitmap(this.queue.getResult('03_text01'));
		this.text01.alpha = 0;
		this.text01.x = 370;
		this.text01.y = 2050;

		createjs.Tween.get(this.text01)
		.to({
			x: 400,
			alpha: 1 
		}, 2500);

		this.text02 = new createjs.Bitmap(this.queue.getResult('03_text02'));
		this.text02.alpha = 0;
		this.text02.x = 430
		this.text02.y = 2050;
		createjs.Tween.get(this.text02)
		.to({
			x: 450,
			alpha: 1 
		}, 2500)
		.call(()=>{
			resolve();
		});

		this.container.addChild(this.text01, this.text02);
	});
	
}

Screen03.prototype._light = function(){
	this.light = new createjs.Bitmap(this.queue.getResult('04_light'));
	this.light.x = 140;
	this.light.y = 1800;
	this.light.alpha = 0;
	createjs.Tween.get(this.light)
	.to({
		alpha: .4
	}, 3000);
	this.container.addChild(this.light);
}

Screen03.prototype._button = function(){
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
		this.container.removeChild(this.optipbtn);
		this.container.removeChild(this.optipcircle);

		createjs.Tween.get(this.text01)
		.to({
			x: 370,
			alpha: 0 
		}, 1500);

		createjs.Tween.get(this.text02)
		.wait(500)
		.to({
			x: 480,
			alpha: 0 
		}, 1500)
		.call(()=>{
			//移除light光线
			this.container.removeChild(this.light);
			//树枝移动
			this._branch();
		});
	});

	this.container.addChild(this.optipbtn,this.optipcircle);
}

Screen03.prototype._branch = function(){
	this.branch = new createjs.Bitmap(this.queue.getResult('04_branch'));
	this.branch.x = 1400;
	this.branch.y = 1825;

	createjs.Tween.get(this.branch)
	.to({
		x: -1400
	}, 4000);

	let timmer = setTimeout(()=>{
		G.screen = 4;
		clearTimeout(timmer);
	},1000);

	this.container.addChild(this.branch);
	this.container.setChildIndex(this.branch,100);
}