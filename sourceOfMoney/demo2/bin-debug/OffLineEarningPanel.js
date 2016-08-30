var OffLineEarningPanel = (function (_super) {
    __extends(OffLineEarningPanel, _super);
    function OffLineEarningPanel() {
        _super.call(this);
        this.skinName = "resource/customer_skins/offLineEarning.exml";
        this.init();
    }
    var d = __define,c=OffLineEarningPanel,p=c.prototype;
    p.init = function () {
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeThisPanel, this);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeThisPanel, this);
    };
    p.closeThisPanel = function (e) {
        var event = new GameEvents(GameEvents.CLOSE_EVT);
        this.dispatchEvent(event);
    };
    return OffLineEarningPanel;
}(eui.Component));
egret.registerClass(OffLineEarningPanel,'OffLineEarningPanel');
