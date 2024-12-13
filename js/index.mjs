import Game from "./Game.mjs";
import Pion from "./pion.mjs";

addEventListener("DOMContentLoaded",()=>{
    const game = new Game (document.getElementById("damier"));
    game.createAllPon()
})