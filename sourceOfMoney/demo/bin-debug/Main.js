//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("moneyTree");
    };
    /**
     * preload资源组加载完成
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "moneyTree") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };
    /**
     * preload资源组加载进度
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "moneyTree") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     */
    p.createGameScene = function () {
        // 获得舞台的宽和高
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        // 添加背景
        var bgImg = this.createBitMapByName('bg_png');
        bgImg.width = stageW;
        bgImg.height = stageH;
        this.addChildAt(bgImg, 0);
        // 添加摇钱树
        var sourceTree = this.createBitMapByName('normalTree_png');
        sourceTree.scaleX = 0.8;
        sourceTree.scaleY = 0.8;
        sourceTree.x = (stageW - sourceTree.width * .8) * .5;
        sourceTree.y = (stageH - sourceTree.height * .8) * .5;
        this.addChild(sourceTree);
        // 添加摇钱按钮
        var touchBtn = new egret.Shape();
        touchBtn.graphics.beginFill(0xff00ff);
        touchBtn.graphics.drawRect((stageW - 100) * .5, 650, 100, 50);
        touchBtn.graphics.endFill();
        touchBtn.touchEnabled = true;
        touchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.copperRainHandler, this);
        this.addChild(touchBtn);
        // 添加按钮提示文本
        var txInfo = new egret.TextField();
        txInfo.text = '摇钱啦！';
        txInfo.width = 100;
        txInfo.height = 50;
        txInfo.size = 24;
        txInfo.x = (stageW - 100) * .5;
        txInfo.y = 650;
        txInfo.textAlign = 'center';
        // txInfo.textAlign = egret.VerticalAlign.MIDDLE;
        txInfo.lineSpacing = 6;
        txInfo.multiline = true;
        this.addChildAt(txInfo, this.getChildIndex(touchBtn) + 1);
        // 添加飘叶粒子效果
        var texture = RES.getRes('leaftexiao_png');
        var config = RES.getRes('leaftexiao_json');
        this.systemLeaf = new particle.GravityParticleSystem(texture, config);
        this.addChild(this.systemLeaf);
        this.systemLeaf.start();
        // this.copperRainHandler(null);
    };
    p.copperRainHandler = function (e) {
        if (this._copperRainParticle == null) {
            var texture = RES.getRes('silver_png');
            var config = RES.getRes('silverRain_json');
            this._copperRainParticle = new particle.GravityParticleSystem(texture, config);
            this.addChild(this._copperRainParticle);
        }
        this._copperRainParticle.start(1000);
    };
    p.createBitMapByName = function (name) {
        var result = new egret.Bitmap();
        result.texture = RES.getRes(name);
        return result;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
