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

import Mqtt from "./Mqtt"

@ccclass
export default class login extends cc.Component {

    @property(String)
    clientId: string = "1";

    @property(String)
    host: string = "192.168.10.109";

    @property(String)
    port: string = "1883";

    @property(String)
    uname: string = "uname@gmail.com";

    @property(String)
    upassword: string = "123456";

    onLoad () {
        
    }

    start () {
        var self = this;

        try {
            var editboxs = this.node.getComponentsInChildren(cc.EditBox);
            editboxs.forEach(function(edit, index){
                var name = edit.node.name;
                switch(name){
                    case 'clientId':
                        edit.string = self.clientId;
                    break;
                    case 'host':
                        edit.string = self.host;
                    break;
                    case 'port':
                        edit.string = self.port;
                    break;
                    case 'uname':
                        edit.string = self.uname;
                    break;
                    case 'upassword':
                        edit.string = self.upassword;
                    break;
                }
            });

            var login = this.node.getChildByName("layout").getChildByName("login");
            login.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
                cc.log('Mouse down');
                //self.node.getComponentInChildren(mqtt);

                //var mq = new mqtt();
                new Mqtt().login(self.host, Number(self.port), self.clientId);
            });
        
        } catch (error) {
            cc.error(error.toString())
        }
    }

    // update (dt) {}
}
