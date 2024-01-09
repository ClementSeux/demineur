import { EItem } from "../enum/e-item.js";
import { Grid } from "./grid.js";

export class Cell {
    readonly grid: Grid;
    readonly x: number;
    readonly y: number;
    item: EItem = EItem.Ground;
    hit = false;

    get icon(): string {
        return "";
    }

    get isBomb(): boolean {
        return this.item == EItem.Bomb;
    }

    get isExplosion(): boolean {
        return this.item == EItem.Explosion;
    }

    get isGround(): boolean {
        return this.item == EItem.Ground;
    }

    get isRabbit(): boolean {
        return this.item == EItem.Rabbit;
    }

    animate(): void {}

    constructor(grid: Grid, x: number, y: number) {
        this.grid = grid;
        this.x = x;
        this.y = y;
    }

    get risk(): number {
        let n = 0;
        this.grid.explore(this, (near) => {
            if (near.isBomb) {
                n++;
            }
        });
        return n;
    }
}
