import Cells from "./Cells";

export default class Player extends Cells {

    constructor(vec2, hp) {
        super(vec2, hp);
        this.velocity = new cc.Vec2(0.05, 0.05);
    }

    move(vec2){
        if(vec2.x == 0 && vec2.y == 0) return;

        var v = vec2.normalize().scale(this.velocity);

        var pos = this.getPosition();
        pos = pos.add(v);

        this.setPosition(pos);
    }
}