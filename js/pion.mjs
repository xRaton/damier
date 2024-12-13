export default class Pion {
    constructor(col){
        this.case = col
    }
    createPon(i, joueur) {
        let pion = document.createElement("div")
        pion.classList.add("pion")
        pion.classList.add(joueur)
        this.case[i].appendChild(pion)
        return pion
    }
}



