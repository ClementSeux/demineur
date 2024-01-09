import { Cell } from "../logic/entities/cell.js";
import { CellRabbit } from "../logic/entities/cellRabbit.js";
import { CellBomb } from "../logic/entities/cellBomb.js";
import { Grid } from "../logic/entities/grid.js";
import { EItem } from "../logic/enum/e-item.js";

export class GridBuilder {
    grid: Grid;
    width: number = 20;
    height: number = 20;
    density: number = 0.05;

    constructor(grid: Grid) {
        this.grid = grid;
    }

    build(): Cell[][] {
        const nbCells = this.width * this.height;
        const nbBombs = Math.floor(nbCells * this.density);

        const vector = Array(nbCells).fill(EItem.Ground) as EItem[];
        for (let i = 0; i < nbBombs; i++) {
            vector[i] = EItem.Bomb;
        }

        for (let i = nbBombs + 1; i < nbBombs * 2; i++) {
            vector[i] = EItem.Rabbit;
        }

        let nbShuffles = nbCells * 2;
        for (let shuffle = 0; shuffle < nbShuffles * 2; shuffle++) {
            const i = Math.floor(Math.random() * nbShuffles);
            const j = Math.floor(Math.random() * nbCells);
            if (i == j) {
                continue;
            }
            let a = vector[i];
            let b = vector[j];

            vector[i] = b;
            vector[j] = a;
        }

        const rows: Cell[][] = [];
        for (let y = 0; y < this.height; y++) {
            let row = [] as Cell[];
            for (let x = 0; x < this.width; x++) {
                let item = vector[y * this.width + x];

                if (item == EItem.Rabbit) {
                    row.push(new CellRabbit(this.grid, x, y));
                } else if (item == EItem.Bomb) {
                    row.push(new CellBomb(this.grid, x, y));
                } else {
                    row.push(new Cell(this.grid, x, y));
                }
            }
            rows.push(row);
        }
        return rows;
    }
}
