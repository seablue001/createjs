//createjs相关库
import easeljs from 'imports-loader?this=>window!easeljs';
import preloadjs from 'imports-loader?this=>window!preloadjs';
import soundjs from 'imports-loader?this=>window!soundjs';
import tweenjs from 'imports-loader?this=>window!tweenjs';

//全局控制变量
export default {
	//场景值 0:加载界面 1:场景1 2:场景2...
	bg:{},
	screen: 0,
	screenLocked:0
}