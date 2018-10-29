cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World! 111 222'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text + " 3333";

        // this.node.on('mousedown', function ( event ) {
        //     console.log('Hello!');
        //  });

        //var gettype = Object.prototype.toString

        cc.log("type:");

        cc.log(this instanceof cc.Sprite);
    },

    // called every frame
    update: function (dt) {
        this.label.string = this.text + " 3333 444";
    },
});
