import { Grid } from "../logic/entities/grid.js";
import { Cell } from "../logic/entities/cell.js";
import { Game } from "../logic/game.js";
import { IGridView } from "../interfaces/i-grid-view.js";
import { Icon } from "../facades/icon.js";

export class GridView implements IGridView {
    readonly grid: Grid;
    readonly cells: HTMLElement[][] = [];

    constructor(grid: Grid) {
        this.grid = grid;

        // Game.INSTANCE.onHit.listen((cell) =>
        //     this.cells[cell.y][cell.x].classList.remove("mask")
        // );

        // Game.INSTANCE.onHelp.listen(
        //     (e) => (this.cells[e.cell.y][e.cell.x].innerHTML = e.hint)
        // );

        Game.INSTANCE.onChange.listen((cell: Cell) => this.draw(cell));
    }

    // Dessin de la grille
    draw(initalCell?: Cell) {
        let grids = document.getElementsByClassName("ground_grid");
        if (grids.length > 0) {
            const oldHtmlGrid = grids[0];
            oldHtmlGrid.remove();
        }
        // Creation de la grille
        const htmlMain = document.getElementById("ground")!;
        const htmlGrid = document.createElement("ul")!;
        htmlGrid.className = "ground_grid";
        let w = this.grid.width;
        let h = this.grid.height;
        for (let y = 0; y < h; y++) {
            this.cells.push([]);

            // Dessin d'une ligne
            const htmlRow = document.createElement("li");
            const htmlCells = document.createElement("ul");
            htmlRow.className = "ground_row";
            htmlRow.appendChild(htmlCells);
            htmlGrid.appendChild(htmlRow);
            for (let x = 0; x < w; x++) {
                const cell = this.grid.cells[y][x];
                const htmlCell = document.createElement("li");
                htmlCell.classList.add(...Icon.style(cell));
                htmlCell.innerHTML = Icon.of(cell);
                htmlCell.onclick = (_) => {
                    Game.INSTANCE.activate(cell);
                };
                htmlCells.appendChild(htmlCell);
                this.cells[y].push(htmlCell);
            }
        }
        if (initalCell) {
            const targetRow = htmlGrid.children[initalCell.y] as HTMLLIElement;
            const insideTargetRow = targetRow.children[0] as HTMLUListElement;
            const targetCell = insideTargetRow.children[
                initalCell.x
            ] as HTMLLIElement;
            targetCell.classList.add("active");
            let a = true;
        }
        htmlMain.appendChild(htmlGrid);
    }
    // redraw() {
    //     for (let y = 0; y < this.grid.height; y++) {
    //         for (let x = 0; x < this.grid.width; x++) {
    //             const cell = this.grid.cells[y][x];
    //             const htmlCell = this.cells[y][x];

    //             htmlCell.innerHTML = Icon.of(cell);
    //             htmlCell.classList.remove(...htmlCell.classList);
    //             htmlCell.classList.add(...Icon.style(cell));
    //             if (cell.hit) {
    //                 htmlCell.classList.remove("mask");
    //             }
    //         }
    //     }
    // }
}
