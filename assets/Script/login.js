// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
import Utils from "./Utils"

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
        server:{
            default: 'tcp://192.168.10.109',
            displayName: "server",
        },

        score: {
            default: 0,
            displayName: "score (player)",
            tooltip: "The score of player",
        },

        port: {
            default: 1883,
            displayName: "port",
            tooltip: "The score of player",
            type: cc.Integer,
        },

        uname: {
            default: '',
            displayName: "name",
            tooltip: "The score of player",
        },

        upassword: {
            default: '',
            displayName: "password",
            tooltip: "The score of player",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    

    onLoad () {
        cc.log('onLoad');
        var a = [123, 456, 789];

        this.node.color = cc.Color.WHITE;
    },

    start () {
        cc.log('start');

        // this.node.on('mousedown', function ( event ) {
        //     console.log('Hello!');
        //  });

        var label = this.getComponent('EditBox');

        var gettype = Object.prototype.toString

        try {
            var editboxs = this.node.getComponentsInChildren(cc.EditBox);

            for(var i=0; i<editboxs.length; i++){
                var editbox = editboxs[i];
                //editbox.placeholder = 'haha'
            }
            
            var login = Utils.findNodeInChildren(this.node, 'login');
    
            login.on(cc.Node.EventType.MOUSE_UP, function (event) {
                cc.log('MOUSE_UP');
                cc.director.loadScene("game");
            });

        } catch (error) {
            cc.error(error.toString())
        }
    },
    
    /**
     * @param  {Integer} dt
     */
    update (dt) {
    },
});
