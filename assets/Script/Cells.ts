import GameObject from "./GameObject";

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

    setSkinPrefab(skinPrefab: cc.Prefab){
        this.skinPrefab = this.skinPrefab;
        this.skin = cc.instantiate(skinPrefab);
        this.skin.parent = this.node;
    }

    /**
     * 内含
     * @param  {GameObject} gameObject
     */
    contains(cells: Cells){
        var x = this.node.position.x;
        var y = this.node.position.y;
        var r = this.radius;

        var dx = x - cells.node.position.x;
		var dy = y - cells.node.position.y;
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
        //this.setSize(cc.size(this.radius, this.radius));
        var size = cc.size(this.radius, this.radius);
        var sprite = this.skin.getChildByName("sprite");
        this.skin.setContentSize(size)
        sprite.setContentSize(size)
    }

    addHP(hp){
        this.setHP(this.hp + hp);
    }
}