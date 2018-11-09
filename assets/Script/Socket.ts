
const {ccclass, property} = cc._decorator;

@ccclass
export default class Socket {

    ws: WebSocket;

    messagelisteners: Array<Function> = [];

    constructor(){
    }

    connect(host, port){
        var self = this;
        this.ws = new WebSocket("ws://" + host + ":" + port + "/ws");

        this.ws.onopen = function(){
            cc.director.emit("websocket.onopen");
        }

        this.ws.onmessage = function(event){
            //cc.log("onmesg:" + event.data);
            cc.director.emit("websocket.onmessage", event.data);
           //self.sendText('{"id":"0","type":6,"payload":{}}');
        }

        this.ws.onerror = function(event){
            cc.log("WebSocket instance error.");
            cc.director.emit("websocket.onerror", event);
        }

        this.ws.onclose = function(event) {
            cc.log("WebSocket instance closed.");
            cc.director.emit("websocket.onerror", event);
        }
    }

    sendText(message:string){
        this.ws.send(message);
    }
}
