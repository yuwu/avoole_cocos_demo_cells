import GameObject from "./GameObject";

export default class Cells extends GameObject {

    constructor(vec2, hp) {
        super();
        this.color = cc.Color.BLUE;
        this.id = 0;
        this.setHP(hp);
        this.setPosition(vec2);
    }

    setColor(color){
        this.color = color;
    }
    
    /**
     * @param  {Number} hp
     */
    setHP(hp){
        this.hp = hp;
        var radius = Math.sqrt(this.hp/Math.PI);
        this.body.setRadius(radius);
    }

    addHP(hp){
        this.hp += hp;
        var radius = Math.sqrt(this.hp/Math.PI);
        this.body.setRadius(radius);
    }

    reset() {
    }
}