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

@ccclass
export default class CellsManager extends cc.Component {

    @property(cc.SpriteFrame)
    spriteFrames: cc.SpriteFrame[] = [];

    @property(cc.Prefab)
    cellsPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    cellsSkin: cc.Prefab = null;

    static instance: CellsManager = null;

    constructor(){
        super();
        CellsManager.instance = this;
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
    }

    // update (dt) {}

    getRandomCells(){
        var cellsNode = cc.instantiate(this.cellsPrefab);
        var sprite = cellsNode.getComponent(cc.Sprite);
        var i = Math.floor(Math.random() * (this.spriteFrames.length-1));
        sprite.spriteFrame = this.spriteFrames[i];
        return cellsNode;
    }
}
