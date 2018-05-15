import G from './gloable'

export default function Stage(canvasId='stage'){
	this.canvasId = canvasId;
	this._init();
}	

Stage.prototype._init = function(){
	//实例化舞台
	this.stage = new createjs.Stage(this.canvasId);

	//开启触屏事件支持
	createjs.Touch.enable(this.stage);
}