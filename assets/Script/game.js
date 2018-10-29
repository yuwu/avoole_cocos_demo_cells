// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var Wheel = require('Wheel');

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
        bgcolor:{
            default: "#ffffff",
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var wheel = this.getComponentInChildren(Wheel);
        if(wheel instanceof Wheel){
            wheel.setOnWeelListener(this.onWeelListener)
        }
    },

    start () {
        
    },

    update (dt) {
        
    },
    /**
     * @param  {number} type
     * @param  {cc.vec2} vec2
     */
    onWeelListener: function (type, vec2){
        cc.log("onWeelListener type:" + type + " vec2:" + vec2.x);
    }
});
