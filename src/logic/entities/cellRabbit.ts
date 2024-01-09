import { Cell } from "./cell.js";
import { Grid } from "./grid.js";
import { EItem } from "../enum/e-item.js";
import { Game } from "../game.js";
import { CellBomb } from "./cellBomb.js";

export class CellRabbit extends Cell {
    constructor(grid: Grid, x: number, y: number) {
        super(grid, x, y);
        this.item = EItem.Rabbit;

        // Game.INSTANCE.onTic.listen(() => {
        //     if (this.hit) {
        //         this.animate();
        //     }
        // });
    }

    animate() {
        let xmin = 0;
        let xmax = this.grid.width - 1;
        let ymin = 0;
        let ymax = this.grid.height - 1;

        let tries = Array.from(Array(4).keys());
        tries = tries.sort(() => Math.random() - 0.5);
        for (let i = 0; i < 4; i++) {
            let x = this.x;
            let y = this.y;
            switch (tries[i]) {
                case 0:
                    x--;
                    break;
                case 1:
                    x++;
                    break;
                case 2:
                    y--;
                    break;
                case 3:
                    y++;
                    break;
            }
            if (x < xmin || x > xmax || y < ymin || y > ymax) continue;
            if (this.tryCell(x, y)) {
                break;
            }
        }
    }

    tryCell(targetX: number, targetY: number): boolean {
        const targetCell = this.grid.cells[targetY][targetX];
        if (targetCell.isGround) {
            this.grid.cells[this.y][this.x] = new Cell(
                this.grid,
                this.x,
                this.y
            );
            this.grid.cells[this.y][this.x].hit = true;
            this.grid.cells[targetY][targetX] = new CellRabbit(
                this.grid,
                targetX,
                targetY
            );
            this.grid.cells[targetY][targetX].hit = true;
            return true;
        } else if (targetCell.isBomb) {
            this.grid.cells[this.y][this.x] = new Cell(
                this.grid,
                this.x,
                this.y
            );
            this.grid.cells[this.y][this.x].hit = true;
            this.grid.cells[targetY][targetX] = new CellBomb(
                this.grid,
                targetX,
                targetY
            );
            this.grid.cells[targetY][targetX].hit = true;
            this.grid.cells[targetY][targetX].animate();
            return true;
        }
        return false;
    }
}
