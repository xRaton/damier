import Game from "./Game.mjs";

addEventListener("DOMContentLoaded",()=>{
    const game = new Game (document.getElementById("damier"));
    game.createAllPon()
})