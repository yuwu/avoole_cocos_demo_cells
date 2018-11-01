/**
 * 
 */

import Player from "./Player";
import Cells from "./Cells";

export default class World  {

    static init(width, height) {
        if (!World.instance) {
            World.instance = new World(width, height);
        }
        return World.instance;
    }

    static getInstance() {
        return World.instance;
    }
    
    constructor(width, height) {
        this.player = new Player(cc.v2(5, 5), 2);
        this.moveVec2 = cc.Vec2.ZERO;
        this.players = [];
        this.cells = [];
        this.setSize(width, height);
        this.unit = cc.winSize.width / 20;
        this.colors = [cc.Color.BLUE, cc.Color.ORANGE, cc.Color.GREEN, cc.Color.RED, cc.Color.YELLOW, cc.Color.CYAN, cc.Color.MAGENTA];
        World.instance = this;
    }

   setSize(width, height){
       this.width = width;
       this.height = height;
   }

   convertToRendererSpace(pos){
       return pos.mul(this.unit);
   }

    start () {
        this.player.setColor(this.getRandomColor());
        this.player.id = 1;
        this.createDemoWorld();
    }

    movePlayer(vec2){
        this.moveVec2 = vec2;
        //if(vec2.x == 0 && vec2.y == 0) return;
        this.player.move(vec2);
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

    sortPlayers(){
        this.players.sort(this.compareSort);
    }

    update(dt) {
        this.sortPlayers();

        // kill
        this.checkKillCells();
    }

    checkKillCells(){
        var player = this.player;

        // cells
        var cells = this.cells;
        for(var i=0; i<cells.length; i++){
            var cell = cells[i];
            if(player.contains(cell)){
                player.addHP(cell.hp);
                cells.splice(i, 1);
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

    }

    /**
     * 杀死其他玩家
     * @param  {Player} otherPlayer
     */
    onKillPlayer(otherPlayer){

    }

    getRandomColor(){
        var index = Math.floor(Math.random() * (this.colors.length-1));
        return this.colors[index];
    }

    createDemoWorld() {
        var x = Math.random() * this.width;
        var y = Math.random() * this.height;
        
        // cells
        for(var i=0; i<100; i++){
            var x = Math.random() * this.width;
            var y = Math.random() * this.height;
            
            var cell = new Cells(cc.v2(x, y), 0.5);
            cell.setColor(this.getRandomColor());
            this.cells.push(cell);
        }

        // other player
        for(var i=0; i<5; i++){
            var x = Math.random() * this.width;
            var y = Math.random() * this.height;
            var hp = Math.random() * 5;

            var player = new Player(cc.v2(x, y), hp);
            player.setColor(this.getRandomColor());
            this.players.push(player);
        }

        // self
        this.players.push(this.player);

        this.sortPlayers();
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
