import G from './gloable';
export default function Screen01(stage,queue){
	this.stage = stage;
	this.queue = queue;
	this.flowers = [];
	this.flowersPath = [];
	this.container = new createjs.Container();

	//控制花瓣解锁划过顺序，默认从第一个开始划，下一个 curI++
	this.curI = 0;

	this._init();
}


Screen01.prototype._init = function(){
	G.screenLocked = 1;
	//花朵 flower
	this._flower();

	//提示文字
	this._text();

	//手势动画
	this._gestureAnimation();
}


Screen01.prototype._flower = function(){
	//位置
	var flowerPath = [
		[307,403],
		[421,316],
		[571,266],
		[741,261],
		[866,356],
		[1041,331],
		[1051,171]
	];
	for(let i=0;i<7;i++){
		let flowerObj = new createjs.Bitmap(this.queue.getResult('01_flower'));
		flowerObj.regX = flowerObj.regY = 31;
		flowerObj.x = flowerPath[i][0];
		flowerObj.y = flowerPath[i][1];
		this.container.addChild(flowerObj);
		this.flowers.push(flowerObj);
	}

	//解锁路径 x,y,deg
	var path = [
		[332,375,-40],
		[466,288,-18],
		[625,244,0],
		[783,281,30],
		[930,350,-15],
		[1040,270,-90]
	];
	for(let i=0;i<6;i++){
		let flowerPathObj = new createjs.Bitmap(this.queue.getResult('01_flower_path'));
		flowerPathObj.setTransform(path[i][0], path[i][1], .6, .6, path[i][2]);
		flowerPathObj.alpha = 0.3;
		this.container.addChild(flowerPathObj);
		this.flowersPath.push(flowerPathObj);
	}

	this.stage.addChild(this.container);
	this.stage.addEventListener('stagemousemove',(evt)=>{
		let x = evt.stageX;
		let y = evt.stageY;
		let len = this.flowers.length;
		for(let i=0;i<=len-1;i++){
			
			let posX = flowerPath[i][0];
			let posY = flowerPath[i][1];
			if(x>=posX && x<=posX+62 && y>=posY && y<=posY+62){
				if(this.curI === i){
					if(this.curI === 0){
						//隐藏手势
						this.container.removeChild(this.animation);
						createjs.Ticker.setFPS(60);
					}
					//花瓣旋转
					createjs.Tween.get(this.flowers[i],{loop:true},true)
					.to({
						rotation:360
					},1500);

					//花瓣间路径高亮
					try{
						createjs.Tween.get(this.flowersPath[i-1])
						.to({
							alpha: 1
						},1000)
					}catch(e){
						console.log(e);
					}

				
					if(this.curI >= len-1){

						createjs.Tween.get(this.container)
						.to({
							alpha: 0
						},1000)
						.call(()=>{
							this.stage.removeChild(this.container);
						})
						G.screen = 2;
						return;
					}
					this.curI = this.curI + 1;

				}
			}
			
		}
	});
}

Screen01.prototype._text = function(){
	this.text = new createjs.Bitmap(this.queue.getResult('01_text'));
	this.text.x = 540;
	this.text.y = 520;
	this.container.addChild(this.text);
}


Screen01.prototype._gestureAnimation = function(){
	this.gestureSprite = new createjs.SpriteSheet({
		images:[this.queue.getResult('01_handtip')],
		frames:{
			width:218,
			height:200,
			count:5
		},
		animations:{
			handtip:[0,1,2,3,4,4,0]
		}
	}); 


	this.animation = new createjs.Sprite(this.gestureSprite, "handtip");
	this.animation.setTransform(300, 430, 1, 1, -35);
	createjs.Ticker.setFPS(3);
	this.container.addChild(this.animation);
}