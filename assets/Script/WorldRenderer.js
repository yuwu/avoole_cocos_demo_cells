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
        wordWidth: 20,
        wordHeight: 20,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        World.init(this.wordWidth, this.wordHeight);
        this.world = World.getInstance();
        World.getInstance().start();
    },

    start () {

        // var circle = gameObject.body;
        // var radius = this.body.radius;

        // var dx = this.x - circle.x;
		// var dy = this.y - circle.y;
        // var distance = dx * dx + dy * dy;
        
		// var radiusDiff = radius - circle.radius;

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
        
        //this.world.update(dt);

        var graphics = this.getGraphics();
        graphics.clear();

        // cells
        var cells = this.world.cells;
        for(var i=0; i<cells.length; i++){
            this.renderer(graphics, cells[i]);
        }

        // players
        var players = this.world.players;
        for(var i=0; i<players.length; i++){
            this.renderer(graphics, players[i]);
        }
    },

    renderer: function(graphics, cell){
        var unit = this.world.unit;
        var pos = this.world.convertToRendererSpace(cell.getPosition());
        var radius = cell.getRadius() * unit;
        graphics.circle(pos.x, pos.y, radius);
        graphics.fillColor = cell.color;
        graphics.fill();
    }
});
