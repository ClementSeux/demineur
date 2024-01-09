import { Game } from "../logic/game.js";
export class CheatControler {
    constructor() {
        let radioButton = document.getElementById("cheat") as HTMLInputElement;
        radioButton.addEventListener("change", () => {
            Game.INSTANCE.toggleCheatCode();
        });
    }
}
