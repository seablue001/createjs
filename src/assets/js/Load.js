import G from './gloable'

export default function Load(){
	this.progress = 0;
	this._init();
}

var loadDom = null;
var loadspanDom = null;
Load.prototype._init = function(){
	loadDom = document.querySelector('#progress');
	loadspanDom = document.querySelector('#progress span');
	this.queue = new createjs.LoadQueue();
	//注册音频插件
	this.queue.installPlugin(createjs.Sound);
	
	//定义资源加载队列
	this.queue.loadManifest([
		{id:'homeBg', src:'../images/homePage_684d8f7.jpg'},
		{id:'musicBg',src: '../media/music.mp3'},

		//场景一的资源
		{id:'01_flower', src:'../images/flower_ddf789f.png'},
		{id:'01_flower_path', src:'../images/dot_7daf7df.png'},
		{id:'01_text',src:'../images/optipwords_cec9df4.png'},
		{id:'01_handtip',src:'../images/handtip_2a217ef.png'},

		//场景切换按钮
		{id:'screen_optipbtn', src:'../images/optipbtn_61a674a.png'},
		{id:'screen_optipcircle', src:'../images/optipcircle_59cf14b.png'},
		


		//场景二的资源
		{id:'02_text01', src:'../images/p1w1_0b28dab.png'},
		{id:'02_text02', src:'../images/p1w2_5971c24.png'},
		{id:'02_moon', src:'../images/moon_d4c77ad.png'},
		{id:'02_block01', src:'../images/blockbig_ea93d8e.png'},
		{id:'02_block02', src:'../images/block2_6cb88e9.png'},
		{id:'02_block03', src:'../images/block1_7696ddd.png'},
		{id:'02_block04', src:'../images/stair_edf570b.png'},
		{id:'02_girl', src:'../images/girl_63090bc.png'},
		{id:'02_cloud01', src:'../images/cloud1_d65b6e1.png'},
		{id:'02_cloud02', src:'../images/cloud2_71bf032.png'},
		{id:'02_cloud03', src:'../images/cloud3_bc745db.png'},
		{id:'02_cloud04', src:'../images/cloud4_2c8990f.png'},


		//场景二的资源
		{id:'03_text01', src:'../images/p2w1_5c2c750.png'},
		{id:'03_text02', src:'../images/p2w2_95a96b0.png'},

		//场景三的资源
		{id:'04_light', src:'../images/light_4f354be.png'},
		{id:'04_branch', src:'../images/bigtree_1f02526.png'},

		//场景四的资源
		{id:'05_ground', src:'../images/ground_cc8e201.png'},
		{id:'05_ground_bg', src:'../images/treePage_3a1da40.jpg'},
		{id:'05_text01', src:'../images/p3w1_8d3187d.png'},
		{id:'05_text02', src:'../images/p3w2_d1668d1.png'},

		//场景五的资源
		{id:'06_bg', src:'../images/flowerPage_a402a6d.jpg'},
		{id:'06_girllights', src:'../images/girllights_2968f54.png'},
		{id:'06_meteor', src:'../images/meteor_e9fdfcf.png'},
		{id:'06_text01', src:'../images/p4w2_f821859.png'},
		{id:'06_text02', src:'../images/p4w1_d9fb938.png'}
		

		
	]);

	//资源加载进度
	this.queue.on('progress', handleProgress);
	function handleProgress(e){
		this.progress = e.progress;

		loadspanDom.innerText = parseInt(this.progress * 100) + '%';
	}
	//资源加载完成
	this.queue.on('complete', handleComplete);
	function handleComplete(){
		//当资源加载完成
		G.screen = 1;
		G.screenLocked = 0;
		//隐藏加载进度
		loadDom.style.display = 'none';
		createjs.Sound.play('musicBg');
	}


}