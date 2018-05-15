import G from './gloable';
import './resize.js';
import '../scss/index.scss';
//加载Load资源处理类
import Load from './Load';
//加载舞台类
import Stage from './Stage';
import Screen01 from './Screen01'
import Screen02 from './Screen02'
import Screen03 from './Screen03'
import Screen04 from './Screen04'
import Screen05 from './Screen05'


var stageObj = new Stage(); 
var queueObj = new Load();


//主要流程控制
createjs.Ticker.addEventListener('tick',handleTick);

function handleTick(){
	switch(G.screen){
		case 1://场景一
			if(G.screenLocked === 1){
				break;
			}
			G.bg = new createjs.Bitmap(queueObj.queue.getResult('homeBg'));
			stageObj.stage.addChild(G.bg);

			var screen01 = new Screen01(stageObj.stage,queueObj.queue);
			
		break;
		case 2://场景二
			if(G.screenLocked === 2){
				break;
			}
			var screen02 = new Screen02(stageObj.stage,queueObj.queue);
			G.girlAnimate = screen02.girlAnimate;
		break;
		case 3://场景三
			if(G.screenLocked === 3){
				break;
			}
			var screen03 = new Screen03(stageObj.stage,queueObj.queue);
		break;
		case 4://场景四
			if(G.screenLocked === 4){
				break;
			}
			var screen04 = new Screen04(stageObj.stage,queueObj.queue);
		break;
		case 5://场景五
			if(G.screenLocked === 5){
				break;
			}
			var screen05 = new Screen05(stageObj.stage,queueObj.queue);
		break;
	}

	stageObj.stage.update();
}