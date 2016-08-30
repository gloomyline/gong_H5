var GameEvents = (function (_super) {
    __extends(GameEvents, _super);
    function GameEvents(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=GameEvents,p=c.prototype;
    GameEvents.CLOSE_EVT = 'closeEvt';
    return GameEvents;
}(egret.Event));
egret.registerClass(GameEvents,'GameEvents');
