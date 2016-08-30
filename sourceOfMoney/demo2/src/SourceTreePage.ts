class SourceTreePage extends eui.Component{
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.init, this);
		this.skinName = 'resource/customer_skins/sourceTree.exml';
	}

	public closeTreeLvUpPanel(){
		this.removeChild(this._lvUpPanel)
	}

	private sourceTreeBtn:eui.Button;
	private toggleBtn:eui.Image;
	private fnBtnGroup:eui.Group;
	private lvUpBtn:eui.Button;
	private dialog:eui.Rect;
	public static _isStepFromLogin:boolean = true;//确认是否是登录之后跳转到花园界面

	private init():void{
		this.leafRain();

		this.sourceTreeBtnEvent();

		this.toggleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.popupPanel,this);

		this.lvUpBtnEvent();

		this.popUpOffLineEarningPanel();

		this.runPopupDialog();

	}

	private dialogGroup:eui.Group;
	// 弹出宫女对话框
	private runPopupDialog(){
		this.dialogGroup.visible = true;
		var timer:egret.Timer = new egret.Timer(10000,0);
		timer.addEventListener(egret.TimerEvent.TIMER,this.popupDialog,this);
		timer.start();

		this.dialogGroup.touchEnabled = true;
		this.dialogGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent) => {
			this.dialogGroup.visible = false;
		},this)
	}

	private dialogContent:eui.Label;
	private _arrayDialog:string[] = [];
	private popupDialog(e:egret.TimerEvent):void{
		this.dialogGroup.visible = true;
		this._arrayDialog = RES.getRes('arrayDialog_json');
		
	}

	// 落叶粒子效果
	private leafRain():void{
		var leaf = RES.getRes("leaftexiao_png");
		var config = RES.getRes('leaftexiao_json');
        var systemLeaf:particle.GravityParticleSystem = new particle.GravityParticleSystem(leaf,config);
        this.addChild(systemLeaf);
        systemLeaf.start();
	}

	// 离线收益面板
	private _offLineEarning:OffLineEarningPanel;
	private popUpOffLineEarningPanel():void{
		if(SourceTreePage._isStepFromLogin){
			this.createMask();
			this._offLineEarning = new OffLineEarningPanel();
			this._offLineEarning.x = (GameData.getStageW() - this._offLineEarning.width) * .5;
			this._offLineEarning.y = (GameData.getStageH() - this._offLineEarning.height) * .5;
			this._offLineEarning.addEventListener(GameEvents.CLOSE_EVT,(e:GameEvents) => {
				this.removeChild(this._offLineEarning);
				this.removeMask();
			},this);
			this.addChild(this._offLineEarning);
		}
	}

	// 升级按钮绑定事件
	private lvUpBtnEvent():void{
		this.lvUpBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e:egret.TouchEvent) => {
			this.lvUpBtn.scaleX = 0.9;
			this.lvUpBtn.scaleY = 0.9;
		},this);

		this.lvUpBtn.addEventListener(egret.TouchEvent.TOUCH_END,(e:egret.TouchEvent) => {
			this.lvUpBtn.scaleX = 1.0;
			this.lvUpBtn.scaleY = 1.0;
		},this);

		this.lvUpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.popUpLvUpPanel,this);
	}

	// 弹出升级灵树的信息面板
	private _lvUpPanel:TreeLvUpPanel;
	private popUpLvUpPanel(e:egret.TouchEvent):void{
		this._lvUpPanel = new TreeLvUpPanel();
		this._lvUpPanel.x = (this.stage.stageWidth - this._lvUpPanel.width) * .5; 
		this._lvUpPanel.y = (this.stage.stageHeight - this._lvUpPanel.height) * .5;
		this.createMask();
		this.addChild(this._lvUpPanel);

		// 添加关闭面板按钮监听程序
		this._lvUpPanel.addEventListener(GameEvents.CLOSE_EVT,() => {
			this.removeMask();
			this.removeChild(this._lvUpPanel);
		},this)
	}

	// 弹出、隐藏功能按钮组
	private popupPanel(e:egret.TouchEvent):void{

		//功能按钮组需要添加Tween缓动动画 
		if(this.fnBtnGroup.visible == false){
			this.fnBtnGroup.visible = true;		
		}
		else{
			this.fnBtnGroup.visible = false;
		}
	}

	// 摇钱按钮绑定事件
	private sourceTreeBtnEvent():void{
        this.sourceTreeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.silverRainHandler,this);
		this.sourceTreeBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,()=>{
			this.sourceTreeBtn.scaleX = 0.9;
			this.sourceTreeBtn.scaleY = 0.9;
		},this)
		this.sourceTreeBtn.addEventListener(egret.TouchEvent.TOUCH_END,()=>{
			this.sourceTreeBtn.scaleX = 1.0;
			this.sourceTreeBtn.scaleY = 1.0;
		},this)
	}
	
	// 铜钱落地粒子效果
	private _systemSilverRain:particle.GravityParticleSystem;
	private silverRainHandler(e:egret.TouchEvent):void{
		if(this._systemSilverRain == null){
			var silver = RES.getRes('silver_png');
			var config = RES.getRes('silverRain_json');
			this._systemSilverRain = new particle.GravityParticleSystem(silver,config);

			this.addChild(this._systemSilverRain);
		}
		this._systemSilverRain.start(1000);
	}

	private _mask:eui.Image;
	// 创建遮罩
	private createMask():void{
		/**
		 * eui.Image类实例出来的对象
		 * touchEnalbe属性默认为true
		 * 遮罩层对象的touchEnable属性需要设置成true这样才能到达遮罩效果
		 */
		this._mask = new eui.Image(RES.getRes("zhezhao_png"));
		this.addChild(this._mask);
	}
	// 去除遮罩
	private removeMask():void{
		this.removeChild(this._mask);
	}
}