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

/**
* @type  {{a：number，b：string}} 
*/
@ccclass
export default class login2 extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        var a = [123, 456, 789];
        

        var profile =  {
            name: "Jare Guo",
            email: "blabla@gmail.com",
            'zip code': 12345,
            isInvited: true
        }
    }

    start () {
        cc.log('start');

        // this.node.on('mousedown', function ( event ) {
        //     console.log('Hello!');
        //  });

        var label = this.getComponent('EditBox');

        var gettype = Object.prototype.toString

        try {
            var editboxs = this.node.getComponentsInChildren(cc.EditBox);

            for(var i=0; i<editboxs.length; i++){
                var editbox = editboxs[i];
                editbox.placeholder = 'haha'
            }
            
            var login = this.node.getChildByName('login');

            console.log('login:' + login);

            cc.log(login instanceof cc.Node);

            login.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
                console.log('Mouse down');
            });

            var background = this.node.getChildByName("background");
            var sprite = background.getComponent(cc.Sprite);
            sprite.spriteFrame = new cc.SpriteFrame("HelloWorld");
        
            

        } catch (error) {
            cc.error(error.toString())
        }
    }

    // update (dt) {}
}
