import { Game } from "../logic/game.js";

export class Popup {
    public static readonly INSTANCE: Popup = new Popup();
    private constructor() {}

    win() {
        this.show("win");
        Game.INSTANCE.toggleCheatCode();
    }

    lose() {
        this.show("lose");
        Game.INSTANCE.toggleCheatCode();
    }

    show(popup: string) {
        const div = document.getElementById(popup)!;
        div.classList.remove("hidden");
    }
}
