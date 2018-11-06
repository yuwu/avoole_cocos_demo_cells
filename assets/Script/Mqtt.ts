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

export default class Mqtt {

    constructor(){
        
    }

    login(host, port, clientId){
        // var client = new Paho.MQTT.Client(host, Number(port), clientId);

        // // set callback handlers
        // client.onConnectionLost = onConnectionLost;
        // client.onMessageArrived = onMessageArrived;
        
        // // connect the client
        // client.connect({onSuccess:onConnect});
        
        // // called when the client connects
        // function onConnect() {
        //     // Once a connection has been made, make a subscription and send a message.
        //     cc.log("onConnect");
        //     client.subscribe("World");
        //     var message = new Paho.MQTT.Message("Hello");
        //     message.destinationName = "World";
        //     client.send(message);
        // }
        
        // // called when the client loses its connection
        // function onConnectionLost(responseObject) {
        //     if (responseObject.errorCode !== 0) {
        //         cc.log("onConnectionLost:"+responseObject.errorMessage);
        //     }
        // }
        
        // // called when a message arrives
        // function onMessageArrived(message) {
        //     cc.log("onMessageArrived:"+message.payloadString);
        // }
    }
}
