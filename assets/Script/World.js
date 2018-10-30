/**
 * 
 */

import Player from "./Player";
import Cells from "./Cells";

export default class World  {
    
    constructor() {
        this.player = new Player(cc.v2(10, 10));
        this.heros = new Array();
        this.cells = new Array();
        this.setSize(100, 100);
    }

   setSize(width, height){
       this.width = width;
       this.height = height;
   }

    start () {
        this.player.setColor(cc.Color.BLUE);
        this.createDemoWorld();
    }

    update(dt) {
    }

    createDemoWorld() {
        var colors = [cc.Color.BLUE, cc.Color.GRAY, cc.Color.GREEN, cc.Color.RED, cc.Color.YELLOW];

        this.heros.push(new Cells(cc.v2(5, 5), 20));

        for(var i=0; i<50; i++){
            var x = Math.random() * this.width;
            var y = Math.random() * this.height;

            var index = Math.random() * (colors.length-1);

            var cells = new Cells(cc.v2(x, y), 10);
            cells.setColor(colors[index]);

            this.cells.push(cells);
        }
    }

    
    /**
     * @param  {number} value
     * @param  {number} min
     * @param  {number} max
     */
    range(value , min, max){
        return Math.min(Math.max(value, min), max);
    }
}
