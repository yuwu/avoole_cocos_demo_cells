
var Circle = cc.Class({
    properties: {
        x: 0,
        y: 0,
        radius: 0,
    },

    /**
     * 设置圆心的X和Y坐标
     * @param  {number} x X 坐标
     * @param  {number} y Y 坐标
     */
    setPosition: function(x, y){
		this.x = x;
		this.y = y;
    },

    /**
     * @returns 坐标
     */
    getPosition: function(){
		return cc.v2(this.x, this.y);
    },
    
    /**
     * 设置圆的半径
     * @param  {number} radius 圆半径
     */
    setRadius: function(radius){
		this.radius = radius;
    },

    /**
     * @returns 面积
     */
    area: function(){
        return this.radius * this.radius * Math.PI;
    },
    
    /**
     * 两圆是否重叠
     * @param  {Circle} circle
     */
    overlaps: function(circle){
		var dx = this.x - circle.x;
		var dy = this.y - circle.y;
		var distance = dx * dx + dy * dy;
		var radiusSum = this.radius + circle.radius;
		return distance < radiusSum * radiusSum;
    },
    
    /**
     * 检查这个圆是否包含给定的点。
     * @param  {number} x X 坐标
     * @param  {number} y Y 坐标
     * @returns 如果这个圆包含给定的点，则为true。
     */
    contains: function(x, y){
		x = this.x - x;
		y = this.y - y;
		return x * x + y * y <= this.radius * this.radius;
    },
    
    /**
     * @requires 返回这个圆的周长
     */
    circumference: function(){
		return this.radius * Math.PI * 2;
    },

    /**
     * 指定一点与圆心组成一条直线，求这条直线与圆相交且与指定点距离最短的一点
     * @param {number} x 
     * @param {number} y 
     */
    intersect: function(x, y){
        //1. 求直线与圆相交的两点
        var a = this.x;
        var b = this.y;

        var C = x - a;
        var D = y - b;

        var R = this.radius;

        var cx = Math.pow(C*C*R*R/(C*C+D*D), 0.5);
        var cy = Math.pow(D*D*R*R/(C*C+D*D), 0.5);

        var p1 = cc.v2(cx+a, cy+b);
        var p2 = cc.v2(-cx+a, -cy+b)

        //2. 求p1, p2与指定点(x, y)距离最短的一点
        //var pm1 = Vector2.len(p1.x - x, p2.y - y);
        //var pm2 = Vector2.len(p2.x - x, p2.y - y);
        //return pm1 <= pm2 ? p1 : p2;
        var p1X =  cx + a;
        var p1Y =  cy + b;
        var p2X = -cx + a;
        var p2Y = -cy + b;

        var sX = 0;
        var sY = 0;
        var q = this.getQuadrant(x, y);
        switch (q){
            case 1:
                sX = p1X;
                sY = p1Y;
                break;
            case 2:
                sX = p2X;
                sY = p1Y;
                break;
            case 3:
                sX = p2X;
                sY = p2Y;
                break;
            case 4:
                sX = p1X;
                sY = p2Y;
                break;
            default:
                break;
        }

        return cc.v2(sX, sY);
    },

    getQuadrant: function(x, y){
        var a = this.x;
        var b = this.y;
        if(x >= a && y >=b){
            return 1;
        }else if(x <= a && y >=b){
            return 2;
        }else if(x <= a && y <=b){
            return 3;
        }else if(x >= a && y <=b){
            return 4;
        }
        return 0;
    }
});

module.exports = Circle;
