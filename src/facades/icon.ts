import { Cell } from "../logic/entities/cell.js";
import { EItem } from "../logic/enum/e-item.js";
import { Game } from "../logic/game.js";

export class Icon {
    static of(cell: Cell) {
        if (cell.item == EItem.Explosion)
            return '<span class="icon material-symbols-outlined">explosion</span>';
        if (cell.item == EItem.Bomb) {
            return '<span class="icon material-symbols-outlined">bomb</span>';
        }
        if (cell.item == EItem.Rabbit) {
            return '<span class="icon material-symbols-outlined">cruelty_free</span>';
        }
        let n = cell.risk;
        if (n >= 1) return `${n}`;
        return "";
    }

    static style(cell: Cell) {
        let classList = ["ground_cell"];
        if (cell.isGround && cell.hit) {
            classList.push(cell.risk >= 1 ? `risk-${cell.risk}` : "ground");
        }
        if (!cell.hit) {
            classList.push("mask");
        }
        if (cell.item !== EItem.Ground && Game.INSTANCE.cheatCode) {
            classList.push("cheat");
        }

        return classList;
    }
}
