// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var PahoMQTT = require('./paho-mqtt.js');

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        clientId: "1",
        host: "192.168.10.109",
        port: "1883",
        uname: "uname@gmail.com",
        upassword: "123456",
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    start () {
        cc.log("Mqtt.start");
        //this.login(this.host, this.port, this.clientId);
        this.loginWS(this.host, this.port, this.clientId);
    },

    // update (dt) {},

    loginWS(host, port, clientId){
        var ws = new WebSocket("ws://" + host + ":" + port + "/ws");
        ws.onopen = function (event) {
            cc.log("Send Text WS was opened.");
            ws.send("xxx Hello WebSocket, I'm a text message.");



            this.schedule(function(){
                ws.send("ping");

            }, 1, true);
        };
        ws.onmessage = function (event) {
            cc.log("response text msg: " + event.data);
        };
        ws.onerror = function (event) {
            cc.log("Send Text fired an error");
        };
        ws.onclose = function (event) {
            cc.log("WebSocket instance closed.");
        };

        // setTimeout(function () {
        //     if (ws.readyState === WebSocket.OPEN) {
        //         ws.send("Hello WebSocket, I'm a text message.");
        //     }
        //     else {
        //         cc.log("WebSocket instance wasn't ready...");
        //     }
        // }, 3);
    },
    
});