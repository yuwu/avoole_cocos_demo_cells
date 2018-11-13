/**
 * 
 */

import Player from "./Player";
import Cells from "./Cells";
import Utils from "./Utils";
import WorldRenderer from "./WorldRenderer"
import Game from "./Game";
import Socket from "./Socket";
import App from "./App";

export default class World  {

    public static instance: World = null;

    clientId:string = null;
    player: Player = null;
    players = [];
    cells = [];
    width = 0;
    height= 0;

    unit = 0;
    colors = [];

    worldRenderer: WorldRenderer;
    
    static init(width, height) {
        if (World.instance == null) {
            World.instance = new World(width, height);
        }
    }

    static getInstance() {
        return World.instance;
    }
    
    constructor(width, height) {
        this.players = [];
        this.cells = [];
        this.setSize(width, height);
        this.unit = cc.winSize.width / 20;
        this.colors = [cc.Color.BLUE, cc.Color.ORANGE, cc.Color.GREEN, cc.Color.RED, cc.Color.YELLOW, cc.Color.CYAN, cc.Color.MAGENTA];
    }

   setSize(width, height){
       this.width = width;
       this.height = height;
   }

   convertToRendererSpace(pos){
       return pos.mul(this.unit);
   }

   createPlayer(self:World, client:string, nickname:string=""){
        var x = Math.random() * (self.width-0.01);
        var y = Math.random() * (self.height-0.01);

        x = Utils.range(x, 0.01, self.width);

        var player = {
            id: client,
            position:{
                x: x, 
                y: y,
            },
            nickname: nickname,
            velocity: {
                x: 0.5,
                y: 0.5,
            },
            hp: 2,
        };

        return player;
    }

   onmessage(event){
   }

   onMessagePlayerJoin(self, data){
        var x = data.position.x;
        var y = data.position.y;
        var hp = data.hp;
        var velocity = cc.v2(data.velocity.x, data.velocity.y);
        
        var player = new Player();
        player.id = data.id;
        player.node = new cc.Node("Player");
        player.node.group = self.worldRenderer.node.group;
        player.node.parent = self.worldRenderer.node;
        player.setSkinPrefab(Game.instance.cellsSkin);
        player.setPosition(cc.v2(x, y));
        player.setHP(hp);
        player.setColor(self.getRandomColor());
        player.updateState(self);

        if(data.id == self.clientId){
            self.player = player;
        }
        
        self.players.push(player);

        cc.log("players:" + self.players.length);
        return player;
   }

   onMessageWorldPlayers(self, objects){
        for(var i=0; i<objects.length; i++){
            self.onMessagePlayerJoin(self, objects[i]);
        }
   }

   onMessageWorldCells(self, objects){
        for(var i=0; i<objects.length; i++){
            //var x = Math.random() * (self.width-0.01);
            //var y = Math.random() * (self.height-0.01);
            //x = Utils.range(x, 0.01, self.width);

            var obj = objects[i];
            var id = obj.id;
            var x = obj.position.x;
            var y = obj.position.y;

            var cell = new Cells();
            cell.id = id;
            cell.node = new cc.Node();
            cell.node.group = self.worldRenderer.node.group;
            cell.node.parent = self.worldRenderer.node;
            cell.setSkinPrefab(Game.instance.cellsSkin);
            cell.setPosition(cc.v2(x, y));
            cell.setHP(0.5);
            cell.setColor(self.getRandomColor());
            cell.updateState(self);

            self.cells.push(cell);
        }
    }

    onMessageCellDeath(self, data){
        var cells = self.cells;
        for(var i=0; i<cells.length; i++){
            var cell = cells[i];
            if(cell.id == data.id){
                cells.splice(i, 1);
                cell.node.destroy();
                break;
            }
        }
    }


    start () {
        var self = this;
        cc.director.on("websocket.onmessage", function(event){
            //cc.log("websocket.onmessage. " + event.detail);

            var text = event.detail;
            var message = JSON.parse(text);
            var type = message.type;

            //socket.sendText('{"id":"0","type":6,"payload":{}}');
            //cc.log("websocket.onmessage. type " + type);

            switch(type){ 
                case 6:// World
                // width"
                // height
                // cells
                // players
                var world = message.payload;
                var client = world.client;
                var width = world.width;
                var height = world.height;
                var cells = world.cells;
                var players = world.players;

                // cells
                self.onMessageWorldCells(self, cells);

                // 其他玩家
                self.onMessageWorldPlayers(self, players);

                // 当前玩家加入
                self.clientId = client;
                
                var newplayer = self.createPlayer(self, client, "cocos");
                var payload = JSON.stringify(newplayer);
                App.socket.sendText('{"id":"0","type":7,"payload":' + payload +'}');
                break;
                case 7://PlayerJoin
        
                cc.log("PlayerJoin 1");

                var player = message.payload;
                self.onMessagePlayerJoin(self, player);
                //cc.log("PlayerJoin:" + player);
                break;
                default:
                break;
            }
        });
        
        App.socket.sendText('{"id":"0","type":6,"payload":{}}');
    }

    movePlayer(vec2){
        if((vec2.x == 0 && vec2.y == 0 ) || (this.player == null)) return;

        this.player.move(vec2);
        this.player.updateState(this);

        var p = this.player;
        var data = {
            id: p.id,
            position:{
                x: p.position.x, 
                y: p.position.y
            },
            nickname: p.nickname,
            velocity: {
                x: p.velocity.x, 
                y: p.velocity.y
            },
            hp: p.hp,
        };
        var payload = JSON.stringify(data);
        App.socket.sendText('{"id":"0","type":8,"payload":'+payload+'}');
       
        //cc.log("movePlayer length:" + this.players.length);
    }

    compareSort(cell1, cell2){
        if (cell1.hp < cell2.hp) {
            return -1;
        } else if (cell1.hp > cell2.hp) {
            return 1;
        } else {
            return 0;
        }
    }

    update(dt) {
        //this.sortPlayers();

        // kill
        this.checkKillCells();
    }

    checkKillCells(){
        if(this.player == null) return;

        var player = this.player;

        
        // cells
        var cells = this.cells;
        for(var i=0; i<cells.length; i++){
            var cell = cells[i];
            if(player.contains(cell)){
                player.addHP(cell.hp);
                cells.splice(i, 1);
                cell.node.destroy();
                this.onKillCell(cell);
                break;
            }
        };

        // players
        var players = this.players;
        for(var i=0; i<players.length; i++){
            var _palyer = players[i];
            if(player.id == _palyer.id){
                continue;
            }
            if(player.contains(_palyer)){
                player.addHP(_palyer.hp);
                players.splice(i, 1);
                _palyer.node.destroy();
                this.onKillPlayer(_palyer);
                break;
            }
        };
    }
    
    /**
     * cells被吃掉
     * @param  {Cells} cell
     */
    onKillCell(cell){
        var data = {
            id: cell.id,
        };
        // var payload = JSON.stringify(data);
        //App.socket.sendText('{"id":"0","type":8,"payload":{"id":"'+ cell.id +'"}}');
        App.socket.sendText('{"id":"0","type":11,"payload":{"id":"'+cell.id+'"}');
    }

    /**
     * 杀死其他玩家
     * @param  {Player} otherPlayer
     */
    onKillPlayer(player){
        App.socket.sendText('{"id":"0","type":9,"payload":{"id":'+player.id+'}');
    }

    getRandomColor(){
        var index = Math.floor(Math.random() * (this.colors.length-1));
        return this.colors[index];
    }

    /**
     * @param  {number} value
     * @param  {number} min
     * @param  {number} max
     */
    static range(value , min, max){
        return Math.min(Math.max(value, min), max);
    }
}
