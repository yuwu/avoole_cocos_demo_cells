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
import World from "./World";
import Utils from "./Utils";

@ccclass
export default class WorldRenderer extends cc.Component {

    @property
    public wordWidth: number = 20;

    @property
    public wordHeight: number = 20;

    @property(cc.Camera)
    public camera: cc.Camera = null;

    constructor(){
        super();
    }

    onLoad () {
        World.init(this.wordWidth, this.wordHeight);
        var world = World.getInstance();
        world.worldRenderer = this;
        world.start();
    }

    start () {
        // var circle = gameObject.body;
        // var radius = this.body.radius;

        // var dx = this.x - circle.x;
        // var dy = this.y - circle.y;
        // var distance = dx * dx + dy * dy;
        
        // var radiusDiff = radius - circle.radius;

    }

    getGraphics(){
        return this.getComponent(cc.Graphics);
    }

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

        // var world = World.getInstance();

        // var graphics = this.getGraphics();
        // graphics.clear();

        // // cells
        // var cells = world.cells;
        // for(var i=0; i<cells.length; i++){
        //     this.renderer(graphics, cells[i]);
        // }

        // // players
        // var players = world.players;
        // for(var i=0; i<players.length; i++){
        //     this.renderer(graphics, players[i]);
        // }
    }

    lateUpdate(){
        // camera position
        var world = World.getInstance();
        var player = world.player;
        if(player == null) return;
        
        var position = world.convertToRendererSpace(player.getPosition());

        var size = this.node.getContentSize();

        var worldSize = world.convertToRendererSpace(cc.v2(world.width, world.height));

        var x = Utils.range(position.x, size.width/2, worldSize.x-size.width/2);
        var y = Utils.range(position.y, size.height/2, worldSize.y-size.height/2);

        this.camera.node.position = cc.v2(x, y);
    }

    renderer (graphics, cell){
        var world = World.getInstance();
        var unit = world.unit;
        var pos = world.convertToRendererSpace(cell.getPosition());
        var radius = cell.getRadius() * unit;
        graphics.circle(pos.x, pos.y, radius);
        graphics.fillColor = cell.color;
        graphics.fill();
    }
}
