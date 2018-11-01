
export default class Utils {

    constructor(){
    }

    public static findNodeInChildren(node, name) {
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
    }

    public static inCircle(a, b, radius, x, y) {
        x = a - x;
        y = b - y;
        return x * x + y * y <= radius * radius;
    }
    
    public static range(min, max, value) {
        return Math.min(Math.max(value, min), max);
    }

    public static findNode(node, name) {
        return node.getChildByName(name);
    }
}
