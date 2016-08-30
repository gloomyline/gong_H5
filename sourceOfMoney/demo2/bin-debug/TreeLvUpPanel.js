var TreeLvUpPanel = (function (_super) {
    __extends(TreeLvUpPanel, _super);
    function TreeLvUpPanel() {
        _super.call(this);
        this._currentTreeLevel = 0;
        this._cTreeLevel = 0;
        this._userCurrentPower = 21000;
        this.skinName = "resource/customer_skins/lvUpPanel.exml";
        // this.addEventListener(eui.UIEvent.COMPLETE,this.init,this);
        this.init();
    }
    var d = __define,c=TreeLvUpPanel,p=c.prototype;
    p.init = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeThisPanel, this);
        this.lvUpBtnEvent();
        this.renderTheLvUpGroup();
    };
    p.renderTheLvUpGroup = function () {
        // 读取用户当前信息,获取到灵树系统的信息,
        // 此处使用本地信息模拟服务器交互获得到的用户信息
        this.sourceTreeData = RES.getRes('lvUpGroup_json');
        this._currentTreeLevel = this._currentTreeLevel == 0 ? this.sourceTreeData.currentLevel : this._currentTreeLevel;
        var treeInfos = this.sourceTreeData.treeInfos;
        this.treeLevel.text = treeInfos[this._currentTreeLevel].treeLevel;
        this.nextLevel.text = treeInfos[this._currentTreeLevel].nextLevel;
        this.product.text = treeInfos[this._currentTreeLevel].product;
        this.nextProduct.text = treeInfos[this._currentTreeLevel].nextProduct;
        this.levelUpCondition.text = this.sourceTreeData.treeLevelUpCondition[this._currentTreeLevel];
    };
    p.closeThisPanel = function (e) {
        var event = new GameEvents(GameEvents.CLOSE_EVT);
        this.dispatchEvent(event);
    };
    p.lvUpBtnEvent = function () {
        var _this = this;
        this.lvUpBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.lvUpBtn.scaleX = 0.9;
            _this.lvUpBtn.scaleY = 0.9;
        }, this);
        this.lvUpBtn.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
            _this.lvUpBtn.scaleX = 1.0;
            _this.lvUpBtn.scaleY = 1.0;
        }, this);
        this.lvUpBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            // console.log('levelUp is touched');
            // 此处验证灵树升级条件，符合条件后获取新的数据修改灵树升级面板
            var isLevelUpAble = _this.validateLevelAble();
            if (isLevelUpAble) {
                _this._currentTreeLevel++;
                _this.renderTheLvUpGroup();
            }
        }, this);
    };
    p.validateLevelAble = function () {
        var result;
        // 此处获取用户当前信息，即用户当前势力
        result = this._userCurrentPower > this.sourceTreeData.treeLevelUpCondition[this._currentTreeLevel] ? true : false;
        return result;
    };
    return TreeLvUpPanel;
}(eui.Component));
egret.registerClass(TreeLvUpPanel,'TreeLvUpPanel');
