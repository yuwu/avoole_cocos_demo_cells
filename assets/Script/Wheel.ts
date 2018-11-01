// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import Utils from "./Utils"
import Circle from "./Circle"

@ccclass
export default class Wheel extends cc.Component {

    radius: number = 0;
    bg: cc.Node;
    move: cc.Node;
    moveVec2: cc.Vec2;
    edgeCircle: Circle;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.moveVec2 = cc.Vec2.ZERO;
        this.bg = Utils.findNodeInChildren(this.node, 'bg');
        this.move = Utils.findNodeInChildren(this.node, 'move');

        //this.radius = Math.max(bg.size.width, bg.size.height);
        //var bg = this.node.getChildByName("bg");

        var size = this.bg.getContentSize();
        this.radius = Math.max(size.width, size.height) / 2;

        this.edgeCircle = new Circle();
        this.edgeCircle.setPosition(0, 0);
        this.edgeCircle.setRadius(this.radius);

        this.bg.on(cc.Node.EventType.TOUCH_START, this.onTouchMove, this);
        this.bg.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.bg.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.bg.on(cc.Node.EventType.TOUCH_END, this.onTouchCancel, this);
    }

    onDestroy () {
        //this.node.off('onWeelListener', this.onWeelListener, this);
    }

    start () {
        // // 按下点
        // var graphics = this.getGraphics();
        // graphics.clear();
        // graphics.circle(newVec2.x, newVec2.y, 10);
        // graphics.fillColor = cc.Color.RED;
        // graphics.fill();
    }

    update (dt) {
        
    }

    getGraphics (){
        return this.getComponentInChildren(cc.Graphics);
    }

    onTouchCancel(event){
        this.onTouchMove(event);
        this.move.setPosition(0, 0);
        this.moveVec2 = cc.Vec2.ZERO;
    }

    setOnWeelListener(onWeelListener){
        // this.onWeelListener = function(event){
        //     onWeelListener(event.detail.type, event.detail.vec2);
        // };
        // this.node.on('onWeelListener', this.onWeelListener, this);
    }

    onTouchMove (event) {
        var x = event.getLocationX();
        var y = event.getLocationY();

        var newVec2 = this.bg.convertToNodeSpace(cc.v2(x, y));
        newVec2 = newVec2.sub(cc.v2(this.radius, this.radius));
        
        if(!this.edgeCircle.contains(newVec2.x, newVec2.y)){
            newVec2 = this.edgeCircle.intersect(newVec2.x, newVec2.y);
        }
        this.move.setPosition(newVec2);

        this.moveVec2 = newVec2.clone();
        this.node.emit('onWeelListener', {type: event.getType(), vec2: this.moveVec2});
    }

    getMoveVec2(){
        return this.moveVec2;
    }
}
