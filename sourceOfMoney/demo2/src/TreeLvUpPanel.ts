class TreeLvUpPanel extends eui.Component{
	public constructor() {
		super();
		this.skinName = "resource/customer_skins/lvUpPanel.exml";
		// this.addEventListener(eui.UIEvent.COMPLETE,this.init,this);
		this.init();
	}

	private closeBtn:eui.Button;
	private lvUpBtn:eui.Button;
	private lvUpGroup:eui.Group;
	private init(){
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeThisPanel,this);
		this.lvUpBtnEvent();

		this.renderTheLvUpGroup();
	}
	
	private sourceTreeData:any;
	private treeLevel:eui.Label;
	private nextLevel:eui.Label;
	private product:eui.Label;
	private nextProduct:eui.Label;
	private levelUpCondition:eui.Label;
	private _currentTreeLevel:number = 0;
	private _cTreeLevel:number = 0;
	private renderTheLvUpGroup():void{
		// 读取用户当前信息,获取到灵树系统的信息,
		// 此处使用本地信息模拟服务器交互获得到的用户信息
		this.sourceTreeData = RES.getRes('lvUpGroup_json');
		this._currentTreeLevel = this._currentTreeLevel == 0? this.sourceTreeData.currentLevel : this._currentTreeLevel;
		var treeInfos:any[] = this.sourceTreeData.treeInfos;
		this.treeLevel.text = treeInfos[this._currentTreeLevel].treeLevel;
		this.nextLevel.text = treeInfos[this._currentTreeLevel].nextLevel;
		this.product.text = treeInfos[this._currentTreeLevel].product;
		this.nextProduct.text = treeInfos[this._currentTreeLevel].nextProduct;
		this.levelUpCondition.text = this.sourceTreeData.treeLevelUpCondition[this._currentTreeLevel];
	}

	private closeThisPanel(e:egret.TouchEvent):void{
		var event:GameEvents = new GameEvents(GameEvents.CLOSE_EVT);
		this.dispatchEvent(event);
	}

	private lvUpBtnEvent():void{
		this.lvUpBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e:egret.TouchEvent) => {
			this.lvUpBtn.scaleX = 0.9;
			this.lvUpBtn.scaleY = 0.9;
		},this);

		this.lvUpBtn.addEventListener(egret.TouchEvent.TOUCH_END,(e:egret.TouchEvent) => {
			this.lvUpBtn.scaleX = 1.0;
			this.lvUpBtn.scaleY = 1.0;
		},this);

		this.lvUpBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e:egret.TouchEvent) => {
			// console.log('levelUp is touched');
			// 此处验证灵树升级条件，符合条件后获取新的数据修改灵树升级面板
			var isLevelUpAble:boolean = this.validateLevelAble();
			if(isLevelUpAble){
				this._currentTreeLevel++;
				this.renderTheLvUpGroup();
			}
		},this);
				
	}

	private _userCurrentPower:number = 21000;
	private validateLevelAble():boolean{
		var result:boolean;
		// 此处获取用户当前信息，即用户当前势力

		result = this._userCurrentPower > this.sourceTreeData.treeLevelUpCondition[this._currentTreeLevel]? true : false;
		return result;
	}
}