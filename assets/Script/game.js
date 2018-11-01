// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
import Wheel from "./Wheel";
import WorldRenderer from "./WorldRenderer";

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
        bgcolor: "#ffffff",
        wheel: Wheel,
        worldRenderer: WorldRenderer,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
        this.wheel.setOnWeelListener(function(type, vec2){
            var world = self.worldRenderer.world;
            //world.movePlayer(vec2);
            //world.update(0);
        });
        this.worldRenderer = this.getComponentInChildren(WorldRenderer);
    },

    start () {
        //
    },

    update (dt) {
        var moveVec2 = this.wheel.getMoveVec2();
        var world = this.worldRenderer.world;
        world.movePlayer(moveVec2);

        world.update(dt);
    },
});
