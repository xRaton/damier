
export default class Damier{
    constructor(divDamier){
        this.divDamier = divDamier
    }

    createRow(){
        let row = document.createElement('div')
        row.classList.add('row')
        this.divDamier.appendChild(row)
        return row
    }
    createCase(row){
        let col = document.createElement('div')
        col.classList.add('col')
        row.appendChild(col)
        return col
    }
    createDamier(col){
        for(let i=0;i<10;i++){
            let ligne = this.createRow()
            for(let j=0;j<10;j++){
                let damierCase = this.createCase(ligne)
                if((i+j)%2 === 0){
                    damierCase.classList.add('beige')
                    col.push(damierCase)
                }else{
                    damierCase.classList.add('black')
                }
                damierCase.id = i+'-'+j
            }
        }
    }
}