'use strict';

const {ccclass, property} = cc._decorator;
@ccclass
export default class GameObject extends cc.Component {

    @property(Number)
    id:number = 0;
    
    constructor() {
        super();
    }
    
    /**
     * @param  {cc.Vec2} newPosition
     */
    public setPosition(newPosition: cc.Vec2) {
        this.node.setPosition(newPosition);
    }

    public getPosition(){
        return this.node.getPosition();
    }
}