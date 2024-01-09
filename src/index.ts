import { Grid } from "./logic/entities/grid.js";
import { Game } from "./logic/game.js";
import { GridView } from "./ui/grid.view.js";
import { CheatControler } from "./ui/cheat.js";

window.addEventListener("load", (_) => {
    let grid = new Grid(10, 10, 0.15);
    let view = new GridView(grid);
    let cheatController = new CheatControler();
    view.draw();
    Game.INSTANCE.start();
});
