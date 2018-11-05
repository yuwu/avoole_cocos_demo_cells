import GameObject from "./GameObject";
import Game from "./Game";
import World from "./World";
import Utils from "./Utils";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Cells extends GameObject {

    @property(Number)
    hp:number = 0;

    @property(cc.Color)
    color = cc.Color.BLUE;

    radius:number = 0;

    @property(cc.Prefab)
    skinPrefab: cc.Prefab = null;

    skin:cc.Node = null;

    constructor() {
        super();
    }

    onLoad(){
        this.setSkinPrefab(this.skinPrefab);
        this.setHP(this.hp);
        this.setColor(this.color);
    }

    setSkinPrefab(skinPrefab: cc.Prefab){
        if(skinPrefab == null) return;
        this.skinPrefab = this.skinPrefab;
        this.skin = cc.instantiate(skinPrefab);
        this.skin.parent = this.node;
    }

    /**
     * 内含
     * @param  {GameObject} gameObject
     */
    contains(cells: Cells){
        var x = this.position.x;
        var y = this.position.y;
        var r = this.radius;

        var dx = x - cells.position.x;
		var dy = y - cells.position.y;
        var distance = dx * dx + dy * dy;
        
        var radiusDiff = r - cells.radius;
        
        var success = distance < radiusDiff;
       
		return success;
    }

    setColor(color){
        this.color = color;
        var sprite = this.skin.getChildByName("sprite");
        sprite.color = this.color;
    }
    
    /**
     * @param  {Number} hp
     */
    setHP(hp){
        this.hp = hp;
        this.radius = Math.sqrt(this.hp/Math.PI);
        this.node.zIndex = hp;
    }

    addHP(hp){
        this.setHP(this.hp + hp);
    }

    public setContentSize(size: cc.Size) {
        this.setContentSizes(this.node, size);
    }

    private setContentSizes(node: cc.Node, size: cc.Size) {
        node.setContentSize(size);
        var nodes = node.children;
        for (var i = 0; i < nodes.length; ++i) {
            this.setContentSizes(nodes[i], size);
        }
    }

    updateState(world: World){
        // position
        var position = world.convertToRendererSpace(this.position);
        this.node.setPosition(position);

        // content size
        var size = world.convertToRendererSpace(cc.v2(this.radius * 2, this.radius * 2));
        this.setContentSize(cc.size(size.x , size.y));
    }
}