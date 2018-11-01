'use strict';
import Circle from "./Circle";

export default class GameObject {

    body;
    
    constructor() {
        this.body = new Circle();
    }
    
    public getRadius(){
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
        
        var success = distance < radiusDiff;
        if(success){
            cc.log("success:" + success);
        }
		return success;
    }
    
    /**
     * @param  {cc.Vec2} vec2
     */
    public setPosition(vec2){
        this.body.setPosition(vec2.x, vec2.y);
    }

    public getPosition(){
        return this.body.getPosition();
    }
}