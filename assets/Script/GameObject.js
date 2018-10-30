'use strict';
import Circle from "./Circle";

export default class GameObject {
    
    constructor() {
        this.velocity = new cc.Vec2(0, 0);
        this.body = new Circle();
    }
    
    getRadius(){
        return this.body.radius;
    }

    /**
     * 
     */
    reset() {
    }
    
    /**
     * @param  {GameObject} gameObject
     */
    contains(gameObject){
        return this.body.contains(gameObject.body);
    }
    
    /**
     * @param  {cc.Vec2} vec2
     */
    setPosition(vec2){
        this.body.setPosition(vec2.x, vec2.y);
    }
    
    /**
     * @param  {cc.Vec2} vec2
     */
    setPosition(x, y){
        this.body.setPosition(x, y);
    }

    getPosition(){
        return this.body.getPosition();
    }
}