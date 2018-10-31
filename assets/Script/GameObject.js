'use strict';
import Circle from "./Circle";

export default class GameObject {
    
    constructor() {
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
     * 内含
     * @param  {GameObject} gameObject
     */
    contains(gameObject){
        var circle = gameObject.body;

        var x = this.body.x;
        var y = this.body.y;
        var r = this.body.radius;

        var dx = x - circle.x;
		var dy = y - circle.y;
        var distance = dx * dx + dy * dy;
        
        var radiusDiff = r - circle.radius;
        
		return distance < radiusDiff;
    }
    
    /**
     * @param  {cc.Vec2} vec2
     */
    setPosition(vec2){
        this.body.setPosition(vec2.x, vec2.y);
    }

    getPosition(){
        return this.body.getPosition();
    }
}