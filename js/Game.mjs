import Damier from './damier.mjs';
import Pion from './pion.mjs';

export default class Game {
    constructor(divDamier){
        this.divDamier = divDamier
        this.case = []
        this.possibleMove=[]
        this.selectedPon=[]
        this.enemyPon = []
        this.ponJ1=[]
        this.ponJ2=[]
        this.currentTour = 0 // Pair pour J1, impair J2
        console.log(this.ponJ2)
        console.log(this.ponJ1)
    }

    endTurn(){
        this.currentTour = this.currentTour+1
    }
    createAllPon(){
        const dam = new Damier(this.divDamier)
        dam.createDamier(this.case)
        for(let i=0;i<this.case.length;i++){
            this.move(i)
            if(this.case[i].id.slice(-1)>5){
                let piece = new Pion (this.case,this)
                let pion = piece.createPon(i,"j1")
                this.ponJ1.push(pion)
            }
            else if(this.case[i].id.slice(-1)<4){
                let piece = new Pion (this.case,this)
                let pion = piece.createPon(i,"j2")
                this.ponJ2.push(pion)
            }
        }
    }
    move(i) {
        this.case[i].addEventListener('click',(ev)=>{
            if(this.selectedPon.length > 0){
                if(this.case[i].classList.contains('bg-blue')===true && this.case !== null ){
                    this.selectedPon[0].parentElement.innerHTML = ''
                    ev.target.appendChild(this.selectedPon[0])
                    if(this.selectedPon[0].className.includes('j1') && ev.target.id.slice(-1)<1){
                        this.selectedPon[0].classList.add('queen')
                        this.endTurn()
                    }else if(this.selectedPon[0].className.includes('j2') && ev.target.id.slice(-1)>8){
                        this.selectedPon[0].classList.add('queen')
                        this.endTurn()
                    }
                    if(this.enemyPon[0] !== undefined){
                        ev.target.classList.remove('bg-blue')
                        let enemyToMiam = this.selectEnemyPon(ev)
                        if (enemyToMiam !== undefined){
                            this.miam(enemyToMiam)
                            for(let i=0;i<document.getElementsByClassName("col").length;i++){
                                document.getElementsByClassName("col")[i].classList.remove('bg-blue')
                            }
                            if(this.selectedPon[0].className.includes('j1') && ev.target.id.slice(-1)<1){
                                this.selectedPon[0].classList.add('queen')
                                this.endTurn()
                            }else if(this.selectedPon[0].className.includes('j2') && ev.target.id.slice(-1)>8){
                                this.selectedPon[0].classList.add('queen')
                                this.endTurn()
                            }
                            if(this.ponJ1.length<1||this.ponJ2.length<1){
                                if(this.ponJ1.length<1){
                                    console.log('J2 , you win')
                                }else if (this.ponJ2.length<1){
                                    console.log('J1 , you win')
                                }
                            }
                            this.caseLibre(ev.target)
                            if(this.enemyPon.length===0){
                                this.endTurn()
                                for(let i=0;i<document.getElementsByClassName("col").length;i++){
                                    document.getElementsByClassName("col")[i].classList.remove('bg-blue')
                                }
                            }
                        } else{
                            this.endTurn()
                            for(let i=0;i<document.getElementsByClassName("col").length;i++){
                                document.getElementsByClassName("col")[i].classList.remove('bg-blue')
                            }
                        }
                    }else{
                        this.endTurn()
                        for(let i=0;i<document.getElementsByClassName("col").length;i++){
                            document.getElementsByClassName("col")[i].classList.remove('bg-blue')
                        }
                    }
                }
            } else {
                console.log("case vide")
            }
        })
    }
    // remove eaten ennemy from array of ennemies //
    // let indexOfEnemyToRemove = enemyArray.findIndex((elem) => {elem.direction === enemyPon.direction})
    // enemyArray.splice(indexOfEnemyToRemove,1);
    // return enemyArray
    miam (enemyPon){
        let joueur = enemyPon.elem.firstElementChild.className
        if(joueur.includes('j1')===true){
            this.ponJ1.pop()
        }else if(joueur.includes('j2')===true){
            this.ponJ2.pop()
        }
        enemyPon.elem.innerHTML=''
    }
    selectEnemyPon (ev){
        let goodCase = this.possibleMove.find(({elem})=>elem.id===ev.target.id)
        let trajectoire = goodCase.direction
        return this.enemyPon.find(({direction})=>direction===trajectoire)
    }
    caseLibre(position){
        this.possibleMove=[]
        this.enemyPon=[]
        let caseLT = this.positionLT(position)
        let caseRT = this.positionRT(position)
        let caseLB = this.positionLB(position)
        let caseRB = this.positionRB(position)
        console.log(caseLT)
        if(caseLT !== null && caseLT.childElementCount===0 && this.selectedPon[0].className.includes('j2') === false || this.selectedPon[0].className.includes('queen')===true && caseLT !== null && caseLT.childElementCount===0){
            caseLT.classList.add("bg-blue")
            this.possibleMove.push({
                direction : 'LT',
                elem : caseLT,
            })
            if(this.selectedPon[0].className.includes('queen')===true && caseLT!==null){
                let newCase = caseLT
                let newCaseLT = this.positionLT(newCase)
                console.log(newCase)
                console.log(newCaseLT)
                for(let i=0;i<9;i++){
                    if(newCaseLT !== null && newCaseLT.childElementCount===0 && newCaseLT !== undefined){
                        newCaseLT.classList.add("bg-blue")
                        this.possibleMove.push({
                            direction : 'LT',
                            elem : newCaseLT,
                        })
                    }
                    newCaseLT=this.positionLT(newCaseLT)
                }
            }
        }else if(caseLT !== null && caseLT.childElementCount===1 && caseLT.firstChild.className !== this.selectedPon[0].className){
            this.enemyPon.push({
                direction : 'LT',
                elem : caseLT,
            })
            caseLT = this.positionLT(caseLT)
            if(caseLT !== null && caseLT.childElementCount===0){
                caseLT.classList.add("bg-blue")
                this.possibleMove.push({
                    direction : 'LT',
                    elem : caseLT,
                })
                if(this.selectedPon[0].className.includes('queen')===true && caseLT!==null){
                    let newCase = caseLT
                    let newCaseLT = this.positionLT(newCase)
                    for(let i=0;i<9;i++){
                        if(newCaseLT !== null && newCaseLT.childElementCount===0 && newCaseLT !== undefined){
                            newCaseLT.classList.add("bg-blue")
                            this.possibleMove.push({
                                direction : 'LT',
                                elem : newCaseLT,
                            })
                        }
                        newCaseLT=this.positionLT(newCaseLT)
                    }
                }
            }else if(caseLT === null || caseLT.childElementCount===1){
                this.enemyPon.pop()
            }
        }
        if(caseLB !== null && caseLB.childElementCount===0 && this.selectedPon[0].className.includes('j1') === false || this.selectedPon[0].className.includes('queen')===true && caseLB !== null && caseLB.childElementCount===0){
            caseLB.classList.add("bg-blue")
            this.possibleMove.push({
                direction : 'LB',
                elem : caseLB,
            })
            if(this.selectedPon[0].className.includes('queen')===true){
                let newCase = caseLB
                let newCaseLB = this.positionLB(newCase)
                for(let i=0;i<9;i++){
                    if(newCaseLB !== null && newCaseLB.childElementCount===0 && newCaseLB !== undefined){
                        newCaseLB.classList.add("bg-blue")
                        this.possibleMove.push({
                            direction : 'LB',
                            elem : newCaseLB,
                        })
                    }
                    newCaseLB = this.positionLB(newCaseLB)
                }
            }
        }else if(caseLB !== null && caseLB.childElementCount===1 && caseLB.firstChild.className !== this.selectedPon[0].className){
            this.enemyPon.push({
                direction : 'LB',
                elem : caseLB,
            })
            caseLB = this.positionLB(caseLB)
            if(caseLB !== null && caseLB.childElementCount===0){
                caseLB.classList.add("bg-blue")
                this.possibleMove.push({
                    direction : 'LB',
                    elem : caseLB,
                })
                if(this.selectedPon[0].className.includes('queen')===true){
                    let newCase = caseLB
                    let newCaseLB = this.positionLB(newCase)
                    for(let i=0;i<9;i++){
                        if(newCaseLB !== null && newCaseLB.childElementCount===0 && newCaseLB !== undefined){
                            newCaseLB.classList.add("bg-blue")
                            this.possibleMove.push({
                                direction : 'LB',
                                elem : newCaseLB,
                            })
                        }
                        newCaseLB = this.positionLB(newCaseLB)
                    }
                }
            }else if(caseLB === null && caseLB.childElementCount===1){
                this.enemyPon.pop()
            }
        }
        if(caseRT !== null && caseRT.childElementCount===0 && this.selectedPon[0].className.includes('j2') === false || this.selectedPon[0].className.includes('queen')===true && caseRT !== null && caseRT.childElementCount===0){
            caseRT.classList.add("bg-blue")
            this.possibleMove.push({
                direction : 'RT',
                elem : caseRT,
            })
            if(this.selectedPon[0].className.includes('queen')===true){
                let newCase = caseRT
                let newCaseRT = this.positionRT(newCase)
                for(let i=0;i<9;i++){
                    if(newCaseRT !== null && newCaseRT.childElementCount===0 && newCaseRT !== undefined){
                        newCaseRT.classList.add("bg-blue")
                        this.possibleMove.push({
                            direction : 'RT',
                            elem : newCaseRT,
                        })
                    }
                    newCaseRT = this.positionRT(newCaseRT)
                }
            }
        }else if(caseRT !== null && caseRT.childElementCount===1 && caseRT.firstChild.className !== this.selectedPon[0].className){
            this.enemyPon.push({
                direction : 'RT',
                elem : caseRT,
            })
            caseRT = this.positionRT(caseRT)
            if(caseRT !== null && caseRT.childElementCount===0){
                caseRT.classList.add("bg-blue")
                this.possibleMove.push({
                    direction : 'RT',
                    elem : caseRT,
                })
                if(this.selectedPon[0].className.includes('queen')===true){
                    let newCase = caseRT
                    let newCaseRT = this.positionRT(newCase)
                    for(let i=0;i<9;i++){
                        if(newCaseRT !== null && newCaseRT.childElementCount===0 && newCaseRT !== undefined){
                            newCaseRT.classList.add("bg-blue")
                            this.possibleMove.push({
                                direction : 'RT',
                                elem : newCaseRT,
                            })
                        }
                        newCaseRT = this.positionRT(newCaseRT)
                    }
                }
            }else if(caseRT === null || caseRT.childElementCount===1){
                this.enemyPon.pop()
            }
        }
        if(caseRB !== null && caseRB.childElementCount===0 && this.selectedPon[0].className.includes('j1') === false || this.selectedPon[0].className.includes('queen')===true && caseRB !== null && caseRB.childElementCount===0){
            caseRB.classList.add("bg-blue")
            this.possibleMove.push({
                direction:'RB',
                elem:caseRB,
            })
            if(this.selectedPon[0].className.includes('queen')===true){
                let newCase = caseRB 
                let newCaseRB = this.positionRB(newCase)
                console.log(newCase)
                console.log(newCaseRB)
                for(let i=0;i<9;i++){
                    if(newCaseRB !== null && newCaseRB.childElementCount===0 && newCaseRB !== undefined){
                        newCaseRB.classList.add("bg-blue")
                        this.possibleMove.push({
                            direction : 'RB',
                            elem : newCaseRB,
                        })
                    }
                    newCaseRB = this.positionRB(newCaseRB)
                }
            }
        }else if(caseRB !== null && caseRB.childElementCount===1 && caseRB.firstChild.className !== this.selectedPon[0].className){
            this.enemyPon.push({
                direction : 'RB',
                elem : caseRB,
            })
            caseRB = this.positionRB(caseRB)
            if(caseRB !== null && caseRB.childElementCount===0){
                caseRB.classList.add("bg-blue")
                this.possibleMove.push({
                    direction : 'RB',
                    elem : caseRB,
                })
                if(this.selectedPon[0].className.includes('queen')===true){
                    let newCase = caseRB
                    let newCaseRB = this.positionRB(newCase)
                    for(let i=0;i<9;i++){
                        if(newCaseRB !== null && newCaseRB.childElementCount===0 && newCaseRB !== undefined){
                            newCaseRB.classList.add("bg-blue")
                            this.possibleMove.push({
                                direction : 'RB',
                                elem : newCaseRB,
                            })
                        }
                        newCaseRB = this.positionRT(newCaseRB)
                    }
                }
            }else if(caseRB === null || caseRB.childElementCount===1){
                this.enemyPon.pop()
            }
        }
    }

    positionLT (oldCase) {
        if(oldCase!==null&&oldCase!==undefined){
            let x = oldCase.id.slice(-1)
            let y = oldCase.id.slice(0,1)
            let newPosition = (parseInt(y)-1)+"-"+(parseInt(x)-1)
            let newCase = document.getElementById(newPosition)
            return newCase
        }
    }
    positionLB (oldCase){
        if(oldCase!==null&&oldCase!==undefined){
            let y = oldCase.id.slice(0,1)
            let x = oldCase.id.slice(-1)
            let newPosition = (parseInt(y)-1)+"-"+(parseInt(x)+1)
            let newCase = document.getElementById(newPosition)
            return newCase
        }
    }
    positionRT (oldCase){
        if(oldCase!==null && oldCase!==undefined){
            let x = oldCase.id.slice(-1)
            let y = oldCase.id.slice(0,1)
            let newPosition = (parseInt(y)+1)+"-"+(parseInt(x)-1)
            let newCase = document.getElementById(newPosition)
            return newCase
        }
    }
    positionRB (oldCase){
        if(oldCase!==null&&oldCase!==undefined){
            let x = oldCase.id.slice(-1)
            let y = oldCase.id.slice(0,1)
            let newPosition = (parseInt(y)+1)+"-"+(parseInt(x)+1)
            let newCase = document.getElementById(newPosition)
            return newCase
        }
    }
}
