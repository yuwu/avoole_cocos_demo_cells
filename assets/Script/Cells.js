import GameObject from "./GameObject";

export default class Cells extends GameObject {

    constructor(vec2, hp) {
        super();
        this.color = cc.Color.BLUE;
        this.setHP(hp);
        this.setPosition(vec2.x, vec2.y);
    }

    setColor(color){
        this.color = color;
    }
    
    /**
     * @param  {Number} hp
     */
    setHP(hp){
        this.hp = hp;
        var radius = Math.sqrt(hp/Math.PI);
        this.body.setRadius(radius);
    }

    reset() {
    }
}