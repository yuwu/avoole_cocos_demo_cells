/**
 * 
 */

import Player from "./Player";
import Cells from "./Cells";
import Utils from "./Utils";
import WorldRenderer from "./WorldRenderer"
import Game from "./Game";

export default class World  {

    public static instance: World = null;

    player: Player = null;
    moveVec2 = cc.Vec2.ZERO;
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
        //this.player = new Player();
        this.moveVec2 = cc.Vec2.ZERO;
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

    start () {
        // this.player.setPosition(cc.v2(5, 5));
        // this.player.setHP(2);
        // this.player.setColor(this.getRandomColor());
        // this.player.id = 1;
        // this.player.node = this.worldRenderer.node;

        var x = Math.random() * (this.width-0.01);
        var y = Math.random() * (this.height-0.01);

        this.player = new Player();
        this.player.node = new cc.Node("Player");
        this.player.node.group = this.worldRenderer.node.group;
        this.player.node.parent = this.worldRenderer.node;
        this.player.setSkinPrefab(Game.instance.cellsSkin);
        this.player.setPosition(cc.v2(x, y));
        this.player.setHP(12);
        this.player.setColor(this.getRandomColor());
        this.player.updateState(this);

        // var cell = new Cells();
        // cell.node = new cc.Node("cell");
        // cell.node.group = this.worldRenderer.node.group;
        // cell.node.parent = this.worldRenderer.node;
        // cell.setSkinPrefab(Game.instance.cellsSkin);
        // cell.setPosition(cc.v2(4,4));
        // cell.setHP(4);
        // cell.setColor(this.getRandomColor());
        // cell.updateState(this);
        // this.cells.push(cell);

       this.createDemoWorld();
    }

    movePlayer(vec2){
        this.moveVec2 = vec2;
        this.player.move(vec2);
        this.player.updateState(this);
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
        //this.sortPlayers();

        // kill
        //this.checkKillCells();
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
        // cells
        for(var i=0; i<100; i++){
            var x = Math.random() * (this.width-0.01);
            var y = Math.random() * (this.height-0.01);

            //x = Utils.range(x, 0.01, this.width);

            // var cell = new Cells();
            // cell.setHP(0.5);
            // cell.setPosition(cc.v2(x, y));
            // cell.setColor(this.getRandomColor());
            
            // var cellNode = cc.instantiate(CellsManager.instance.cellsPrefab);
            // cellNode.parent = this.worldRenderer.node;
            // var cell = cellNode.getComponentInChildren(Cells);

            var cell = new Cells();
            // cell.node = new cc.Node();
            // cell.node.parent = this.worldRenderer.node;
            // cell.node.group = this.worldRenderer.node.group;
            // cell.setSkinPrefab(Game.instance.cellsSkin);
            // cell.setPosition(cc.v2(x*this.unit, y*this.unit));
            // cell.setHP(0.5);
            // cell.setColor(this.getRandomColor());
            // cell.updateState(this);

           
            cell.node = new cc.Node();
            cell.node.group = this.worldRenderer.node.group;
            cell.node.parent = this.worldRenderer.node;
            cell.setSkinPrefab(Game.instance.cellsSkin);
            cell.setPosition(cc.v2(x, y));
            cell.setHP(2);
            cell.setColor(this.getRandomColor());
            cell.updateState(this);

            this.cells.push(cell);
        }

        // other player
        for(var i=0; i<5; i++){
            var x = Math.random() * this.width;
            var y = Math.random() * this.height;
            var hp = Math.random() * 5;

            //var player = new Player(cc.v2(x, y), hp);
            //player.setColor(this.getRandomColor());
            //this.players.push(player);
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
