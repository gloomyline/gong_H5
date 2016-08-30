var GameData = (function () {
    function GameData() {
    }
    var d = __define,c=GameData,p=c.prototype;
    GameData.getStageW = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    GameData.getStageH = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    return GameData;
}());
egret.registerClass(GameData,'GameData');
