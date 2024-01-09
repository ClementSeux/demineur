import { Cell } from "./cell.js";
import { Grid } from "./grid.js";
import { EItem } from "../enum/e-item.js";

export class CellBomb extends Cell {
    constructor(grid: Grid, x: number, y: number) {
        super(grid, x, y);
        this.item = EItem.Bomb;
    }

    animate(): void {
        this.hit = true;
        this.item = EItem.Explosion;
    }
}
