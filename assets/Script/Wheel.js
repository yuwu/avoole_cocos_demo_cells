// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var util = require('utils');
var Circle = require('Circle');
var Vector2 = require('Vector2');

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        background: cc.Sprite,
        move: cc.Sprite,

        _radius: 0,
        _bg: cc.Node,
        _move: cc.Node,
        _edgeCircle: Circle,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bg = util.findNodeInChildren(this.node, 'bg');
        this.move = util.findNodeInChildren(this.node, 'move');

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
    },

    onDestroy () {
        this.node.off('onWeelListener', this.onWeelListener, this);
    },

    start () {
        // // 按下点
        // var graphics = this.getGraphics();
        // graphics.clear();
        // graphics.circle(newVec2.x, newVec2.y, 10);
        // graphics.fillColor = cc.Color.RED;
        // graphics.fill();
    },

    update (dt) {
        
    },

    getGraphics: function(){
        return this.getComponentInChildren(cc.Graphics);
    },

    onTouchCancel: function(event){
        this.onTouchMove(event);
        this.move.setPosition(0, 0);
    },

    setOnWeelListener: function(onWeelListener){
        this.onWeelListener = function(event){
            onWeelListener(event.detail.type, event.detail.vec2);
        };
        this.node.on('onWeelListener', this.onWeelListener, this);
    },

    onTouchMove: function(event) {
        var x = event.getLocationX();
        var y = event.getLocationY();

        var newVec2 = this.bg.convertToNodeSpace(cc.v2(x, y));
        newVec2 = newVec2.sub(cc.v2(this.radius, this.radius));
        
        if(!this.edgeCircle.contains(newVec2.x, newVec2.y)){
            newVec2 = this.edgeCircle.intersect(newVec2.x, newVec2.y);
        }
        this.move.setPosition(newVec2);

        this.node.emit('onWeelListener', {type: event.getType(), vec2: newVec2});
    }
});
