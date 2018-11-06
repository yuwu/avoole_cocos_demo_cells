// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Client {
    
    socket: WebSocket = null;
    sendPinger;
    connectOptions;

    constructor(){
        
    }
    
    /**
	 * Repeat keepalive requests, monitor responses.
	 * @ignore
	 */
    Pinger = function(client: Client, keepAliveInterval: number) {
        this._client = client;

        this._keepAliveInterval = keepAliveInterval*1000;
        this.isReset = false;

        var pingReq = "ping"

        var doTimeout = function (pinger) {
            return function () {
                return doPing.apply(pinger);
            };
        };

        /** @ignore */
        var doPing = function() {
            if (!this.isReset) {
                cc.log("Pinger.doPing", "Timed out");
                this._client.disconnected();
            } else {
                cc.log("Pinger.doPing", "send PINGREQ");
                this.isReset = false;
                //this._client.socket.send(pingReq);
                this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
            }
        };

        this.reset = function() {
            this.isReset = true;
            clearTimeout(this.timeout);
            if (this._keepAliveInterval > 0)
                this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
        };

        this.cancel = function() {
            clearTimeout(this.timeout);
        };
    };

    /**
	 * Monitor request completion.
	 * @ignore
	 */
    Timeout = function(client, timeoutSeconds, action, args) {
        if (!timeoutSeconds)
            timeoutSeconds = 30;

        var doTimeout = function (action, client, args) {
            return function () {
                return action.apply(client, args);
            };
        };

        this.timeout = setTimeout(doTimeout(action, client, args), timeoutSeconds * 1000);

        this.cancel = function() {
            clearTimeout(this.timeout);
        };
    };

    connect(connectOptions){
        this.connectOptions = connectOptions;
        this.doConnect(connectOptions.uri);
    }

    onclose(){

    }

    onerror(){
        
    }

    onopen(){
        
    }

    onmessage(event){
        
    }

    private disconnected(){

    }

    private doConnect(uri:string){
        this.sendPinger = new this.Pinger(this, this.connectOptions.keepAliveInterval);
    }

    private reconnect(){

    }
}
