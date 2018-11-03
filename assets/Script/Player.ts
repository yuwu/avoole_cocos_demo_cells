import Cells from "./Cells";
import World from "./World";

export default class Player extends Cells {

    velocity;
    
    constructor(vec2, hp) {
        super(vec2, hp);
        this.velocity = new cc.Vec2(0.05, 0.05);
    }

    move(vec2){
        if(vec2.x == 0 && vec2.y == 0) return;

        var world = World.getInstance();

        var v = vec2.normalize().scale(this.velocity);
        var pos = this.getPosition();
        pos = pos.add(v);

        var playerRadius = this.getRadius();
        var minMargin = playerRadius * (2/3);
        var maxMargin = playerRadius * (2/3);
        pos.x = World.range(pos.x, minMargin, world.width - maxMargin);
        pos.y = World.range(pos.y, minMargin, world.height- maxMargin);

        this.setPosition(pos);
    }
}