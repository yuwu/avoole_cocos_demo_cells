// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import World from "./World";

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
        wordWidth: 200,
        wordHeight: 200,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.world = new World();
        this.world.setSize(this.wordWidth, this.wordHeight);
        this.world.start();
    },

    start () {

    },

    getGraphics: function(){
        return this.getComponent(cc.Graphics);
    },

    update (dt) {
        // var cells = this.world.cells;
        // for(var i=0; i<cells.length; i++){
        //     this.renderer(cells[i]);
        // }

        // var heros = this.world.heros;
        // for(var i=0; i<heros.length; i++){
        //     this.renderer(heros[i]);
        // }

        var graphics = this.getGraphics();

        var player = this.world.player;
        player.setPosition(500, 500);
        player.setHP(10000);
        this.renderer(graphics, player);
    },

    renderer: function(graphics, cell){
        var pos = cell.getPosition();
        graphics.clear();
        graphics.circle(pos.x, pos.y, cell.getRadius());
        graphics.fillColor = cell.color;
        graphics.fill();
    }
});
