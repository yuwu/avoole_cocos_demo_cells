// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var utils = cc.Class({});

/**
 * @type {}
 * @return
 */
utils.printfln = function(){
    cc.log( " hello require");
}

/**
 * @param  {cc.Node} node
 * @param  {string} name
 */
utils.findNode = function(node, name) {
    return node.getChildByName(name);
}

/**
 * @param  {cc.Node} node
 * @param  {string} name
 */
utils.findNodeInChildren = function(node, name) {
    var nodes = node.children;
    for (var i = 0; i < nodes.length; ++i) {

        var child = nodes[i];
        //var fnode = utils.findNode(child, name);
        if(child.name == name){
            return child;
        }
        var resultNode = this.findNodeInChildren(child, name);
        if (resultNode) {
            return resultNode;
        }
    }
    return null;
},

utils.inCircle = function(a, b, radius, x, y) {
    x = a - x;
    y = b - y;
    return x * x + y * y <= radius * radius;
},

utils.range = function(min, max, value) {
    return Math.min(Math.max(value, min), max);
},

module.exports = utils;

