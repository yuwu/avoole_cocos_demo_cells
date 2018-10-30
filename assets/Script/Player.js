import Cells from "./Cells";

export default class Player extends Cells {

    constructor(vec2) {
        super(vec2, 20);
        this.setPosition(vec2.x, vec2.y);
    }

    reset() {
    }
}