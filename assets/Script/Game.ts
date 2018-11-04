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
import Wheel from "./Wheel";
import WorldRenderer from "./WorldRenderer";
import World from "./World";

@ccclass
export default class Game extends cc.Component {

    @property
    public bgcolor: string = "#ffffff";

    @property(Wheel)
    public wheel: Wheel;

    @property(WorldRenderer)
    public worldRenderer: WorldRenderer;

    @property(cc.SpriteFrame)
    spriteFrames: cc.SpriteFrame[] = [];

    @property(cc.Prefab)
    cellsPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    cellsSkin: cc.Prefab = null;

    static instance: Game = null;

    constructor(){
        super();
        Game.instance = this;
    }
    
   onLoad () {
        var self = this;
        this.wheel.setOnWeelListener(function(type, vec2){
            //var world = self.worldRenderer.world;
            //world.movePlayer(vec2);
            //world.update(0);
        });
        this.worldRenderer = this.getComponentInChildren(WorldRenderer);
    }

    start () {
        //
        // cc.render
        // cc.director.getScene
        // cc.Graphics
        // cc.Camera
    }

    update (dt) {
        var moveVec2 = this.wheel.getMoveVec2();
        //var world = World.getInstance();
        var world = World.getInstance();
        if(world != null){
            world.movePlayer(moveVec2);
            world.update(dt);
        }
    }
}
