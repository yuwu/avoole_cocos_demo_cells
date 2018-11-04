'use strict';

const {ccclass, property} = cc._decorator;
@ccclass
export default class GameObject extends cc.Component {

    @property(Number)
    id:number = 0;

    @property(cc.Vec2)
    position: cc.Vec2;
    
    constructor() {
        super();
    }
    
    /**
     * @param  {cc.Vec2} newPosition
     */
    public setPosition(newPosition: cc.Vec2) {
        this.position = newPosition;
    }

    public getPosition(){
        return this.position;
    }
}