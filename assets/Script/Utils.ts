
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
    
    /**
     * @param  {number} value
     * @param  {number} min
     * @param  {number} max
     */
    public static range(value , min, max){
        return Math.min(Math.max(value, min), max);
    }
    
    public static findNode(node, name) {
        return node.getChildByName(name);
    }

    public static uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
     
        var uuid = s.join("");
        return uuid;
    }
}
