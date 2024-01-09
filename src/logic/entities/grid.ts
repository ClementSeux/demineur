import { Cell } from "./cell.js";
import { GridBuilder } from "../../helpers/grid.builder.js";
import { EItem } from "../enum/e-item.js";

export class Grid {
    readonly width: number;
    readonly height: number;
    readonly cells: Cell[][] = [];

    get remaining(): number {
        let n = 0;
        for (let row of this.cells) {
            for (let cell of row) {
                if (cell.isGround && !cell.hit) {
                    n++;
                }
            }
        }
        return n;
    }

    constructor(width: number, height: number, density: number) {
        this.width = width;
        this.height = height;
        const builder = new GridBuilder(this);
        builder.width = width;
        builder.height = height;
        builder.density = density;
        this.cells = builder.build();

        
    }

    explore(cell: Cell, visit: (near: Cell) => void) {
        const xmin = Math.max(cell.x - 1, 0);
        const xmax = Math.min(cell.x + 1, this.width - 1);
        const ymin = Math.max(cell.y - 1, 0);
        const ymax = Math.min(cell.y + 1, this.height - 1);
        for (let y = ymin; y <= ymax; y++) {
            for (let x = xmin; x <= xmax; x++) {
                if (x != cell.x || y != cell.y) {
                    visit(this.cells[y][x]);
                }
            }
        }
    }
}
