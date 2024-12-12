import Game from "./Game.mjs";

export default class checker extends Game {
    constructor(divDamier){
        super(this.case,this.possibleMove,this.selectedPon,this.enemyPon)
        this.divDamier = divDamier
    }
    
}