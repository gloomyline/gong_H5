var SourceTreePage = (function (_super) {
    __extends(SourceTreePage, _super);
    function SourceTreePage() {
        _super.call(this);
        this.addEventListener(eui.UIEvent.COMPLETE, this.init, this);
        this.skinName = 'resource/customer_skins/sourceTree.exml';
    }
    var d = __define,c=SourceTreePage,p=c.prototype;
    p.closeTreeLvUpPanel = function () {
        this.removeChild(this._lvUpPanel);
    };
    p.init = function () {
        this.leafRain();
        this.sourceTreeBtnEvent();
        this.toggleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.popupPanel, this);
        this.lvUpBtnEvent();
        this.popUpOffLineEarningPanel();
        this.runPopupDialog();
    };
    // 弹出宫女对话框
    p.runPopupDialog = function () {
        var _this = this;
        var timer = new egret.Timer(10000, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.popupDialog, this);
        timer.start();
        this.dialogGroup.touchEnabled = true;
        this.dialogGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.dialogGroup.visible = false;
        }, this);
    };
    p.popupDialog = function (e) {
        console.log(1);
        this.dialogGroup.visible = true;
    };
    // 落叶粒子效果
    p.leafRain = function () {
        var leaf = RES.getRes("leaftexiao_png");
        var config = RES.getRes('leaftexiao_json');
        var systemLeaf = new particle.GravityParticleSystem(leaf, config);
        this.addChild(systemLeaf);
        systemLeaf.start();
    };
    p.popUpOffLineEarningPanel = function () {
        var _this = this;
        if (SourceTreePage._isStepFromLogin) {
            this.createMask();
            this._offLineEarning = new OffLineEarningPanel();
            this._offLineEarning.x = (GameData.getStageW() - this._offLineEarning.width) * .5;
            this._offLineEarning.y = (GameData.getStageH() - this._offLineEarning.height) * .5;
            this._offLineEarning.addEventListener(GameEvents.CLOSE_EVT, function (e) {
                _this.removeChild(_this._offLineEarning);
                _this.removeMask();
            }, this);
            this.addChild(this._offLineEarning);
        }
    };
    // 升级按钮绑定事件
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
        this.lvUpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.popUpLvUpPanel, this);
    };
    p.popUpLvUpPanel = function (e) {
        var _this = this;
        this._lvUpPanel = new TreeLvUpPanel();
        this._lvUpPanel.x = (this.stage.stageWidth - this._lvUpPanel.width) * .5;
        this._lvUpPanel.y = (this.stage.stageHeight - this._lvUpPanel.height) * .5;
        this.createMask();
        this.addChild(this._lvUpPanel);
        // 添加关闭面板按钮监听程序
        this._lvUpPanel.addEventListener(GameEvents.CLOSE_EVT, function () {
            _this.removeMask();
            _this.removeChild(_this._lvUpPanel);
        }, this);
    };
    // 弹出、隐藏功能按钮组
    p.popupPanel = function (e) {
        //功能按钮组需要添加Tween缓动动画 
        if (this.fnBtnGroup.visible == false) {
            this.fnBtnGroup.visible = true;
        }
        else {
            this.fnBtnGroup.visible = false;
        }
    };
    // 摇钱按钮绑定事件
    p.sourceTreeBtnEvent = function () {
        var _this = this;
        this.sourceTreeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.silverRainHandler, this);
        this.sourceTreeBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            _this.sourceTreeBtn.scaleX = 0.9;
            _this.sourceTreeBtn.scaleY = 0.9;
        }, this);
        this.sourceTreeBtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            _this.sourceTreeBtn.scaleX = 1.0;
            _this.sourceTreeBtn.scaleY = 1.0;
        }, this);
    };
    p.silverRainHandler = function (e) {
        if (this._systemSilverRain == null) {
            var silver = RES.getRes('silver_png');
            var config = RES.getRes('silverRain_json');
            this._systemSilverRain = new particle.GravityParticleSystem(silver, config);
            this.addChild(this._systemSilverRain);
        }
        this._systemSilverRain.start(1000);
    };
    // 创建遮罩
    p.createMask = function () {
        /**
         * eui.Image类实例出来的对象
         * touchEnalbe属性默认为true
         * 遮罩层对象的touchEnable属性需要设置成true这样才能到达遮罩效果
         */
        this._mask = new eui.Image(RES.getRes("zhezhao_png"));
        this.addChild(this._mask);
    };
    // 去除遮罩
    p.removeMask = function () {
        this.removeChild(this._mask);
    };
    SourceTreePage._isStepFromLogin = true; //确认是否是登录之后跳转到花园界面
    return SourceTreePage;
}(eui.Component));
egret.registerClass(SourceTreePage,'SourceTreePage');
