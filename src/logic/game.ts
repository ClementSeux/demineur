import { Grid } from "./entities/grid.js";
import { GridView } from "../ui/grid.view.js";
import { Cell } from "./entities/cell.js";
import { CellRabbit } from "./entities/cellRabbit.js";

import { Popup } from "../facades/popup.js";
import { IGridView } from "../interfaces/i-grid-view.js";
import { EItem } from "./enum/e-item.js";
import { Subject } from "../helpers/subject.js";

export class Game {
    public static readonly INSTANCE: Game = new Game();
    private constructor() {}

    onTic = new Subject<void>();
    onRabbitTimer = new Subject<void>();
    onChange = new Subject<any>();
    cheatCode = false;

    start() {
        // setInterval(() =>
        //     // Code à exécuter toutes les 5 secondes
        //     {
        //         this.onTic.raise();
        //         this.onChange.raise(null);
        //     }, 5000);
    }

    toggleCheatCode() {
        this.cheatCode = !this.cheatCode;
        this.onChange.raise(null);
    }

    activate(cell: Cell) {
        if (cell.isBomb) {
            cell.animate();
            this.onChange.raise(cell);

            Popup.INSTANCE.lose();
        } else {
            if (cell.isRabbit && cell.hit) {
                cell.animate();
            }
            this.play(cell);
        }

        this.onChange.raise(cell);
    }

    play(cell: Cell) {
        if (!cell.isBomb && !cell.hit) {
            cell.hit = true;

            let grid = cell.grid;
            if (grid.remaining == 0) {
                Popup.INSTANCE.win();
                return;
            }

            let n = cell.risk;
            if (n == 0) {
                grid.explore(cell, (near) => this.play(near));
            }
        }
    }
}
