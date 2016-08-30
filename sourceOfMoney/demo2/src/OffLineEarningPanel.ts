class OffLineEarningPanel extends eui.Component{
	public constructor() {
		super();
		this.skinName = "resource/customer_skins/offLineEarning.exml";
		this.init();
	}

	private _closeBtn:eui.Button;
	private confirmBtn:eui.Button;
	private init():void{
		this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeThisPanel,this)
		this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeThisPanel,this)	
	}

	private closeThisPanel(e:egret.TouchEvent):void{
		var event:GameEvents = new GameEvents(GameEvents.CLOSE_EVT);
		this.dispatchEvent(event);
	}
}