class GameEvents extends egret.Event{
    public static CLOSE_EVT:string = 'closeEvt'; 

    public constructor(type:string,bubbles:boolean=false,cancelable:boolean=false){
        super(type,bubbles,cancelable);
    }

}