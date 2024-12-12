export default class Pion  {
    constructor(col,myGame){
        this.col = col
        this.myGame = myGame
    }
    createPon(i, joueur) {
        let pion = document.createElement("div")
        pion.classList.add("pion")
        pion.classList.add(joueur)
        pion.addEventListener('click',(ev)=>{
            let whatPlayerPlayNow = this.myGame.currentTour % 2 === 0 ? "j1" : "j2"
            if(whatPlayerPlayNow === joueur){
                this.preMove(ev)
            }
        })
        this.col[i].appendChild(pion)
        return pion
    }
    preMove (ev) {
        for(let i=0;i<document.getElementsByClassName("col").length;i++){
            document.getElementsByClassName("col")[i].classList.remove('bg-blue')
        }
        this.myGame.possibleMove=[]
        this.myGame.selectedPon = []
        this.myGame.selectedPon.push(ev.target)
        let position = ev.target.parentElement
        this.caseLibre(position)
    }
    caseLibre(position){
        this.myGame.possibleMove=[]
        this.myGame.enemyPon=[]
        let caseLT = this.positionLT(position)
        let caseRT = this.positionRT(position)
        let caseLB = this.positionLB(position)
        let caseRB = this.positionRB(position)
        if(caseLT !== null && caseLT.childElementCount===0 && this.myGame.selectedPon[0].className.includes('j2') === false || this.myGame.selectedPon[0].className.includes('queen')===true && caseLT !== null && caseLT.childElementCount===0){
            caseLT.classList.add("bg-blue")
            this.myGame.possibleMove.push({
                direction : 'LT',
                elem : caseLT,
            })
            if(this.myGame.selectedPon[0].className.includes('queen')===true && caseLT!==null){
                let newCase = caseLT
                let newCaseLT = this.positionLT(newCase)
                for(let i=0;i<9;i++){
                    if(newCaseLT !== null && newCaseLT.childElementCount===0 && newCaseLT !== undefined){
                        newCaseLT.classList.add("bg-blue")
                        this.myGame.possibleMove.push({
                            direction : 'LT',
                            elem : newCaseLT,
                        })
                    }
                    newCaseLT=this.positionLT(newCaseLT)
                }
            }
        }else if(caseLT !== null && caseLT.childElementCount===1 && caseLT.firstChild.className !== this.myGame.selectedPon[0].className){
            this.myGame.enemyPon.push({
                direction : 'LT',
                elem : caseLT,
            })
            caseLT = this.positionLT(caseLT)
            if(caseLT !== null && caseLT.childElementCount===0){
                caseLT.classList.add("bg-blue")
                this.myGame.possibleMove.push({
                    direction : 'LT',
                    elem : caseLT,
                })
                if(this.myGame.selectedPon[0].className.includes('queen')===true && caseLT!==null){
                    let newCase = caseLT
                    let newCaseLT = this.positionLT(newCase)
                    for(let i=0;i<9;i++){
                        if(newCaseLT !== null && newCaseLT.childElementCount===0 && newCaseLT !== undefined){
                            newCaseLT.classList.add("bg-blue")
                            this.myGame.possibleMove.push({
                                direction : 'LT',
                                elem : newCaseLT,
                            })
                        }
                        newCaseLT=this.positionLT(newCaseLT)
                    }
                }
            }else if(caseLT === null || caseLT.childElementCount===1){
                this.myGame.enemyPon.pop()
            }
        }
        if(caseLB !== null && caseLB.childElementCount===0 && this.myGame.selectedPon[0].className.includes('j1') === false || this.myGame.selectedPon[0].className.includes('queen')===true && caseLB !== null && caseLB.childElementCount===0){
            caseLB.classList.add("bg-blue")
            this.myGame.possibleMove.push({
                direction : 'LB',
                elem : caseLB,
            })
            if(this.myGame.selectedPon[0].className.includes('queen')===true){
                let newCase = caseLB
                let newCaseLB = this.positionLB(newCase)
                for(let i=0;i<9;i++){
                    if(newCaseLB !== null && newCaseLB.childElementCount===0 && newCaseLB !== undefined){
                        newCaseLB.classList.add("bg-blue")
                        this.myGame.possibleMove.push({
                            direction : 'LB',
                            elem : newCaseLB,
                        })
                    }
                    newCaseLB = this.positionLB(newCaseLB)
                }
            }
        }else if(caseLB !== null && caseLB.childElementCount===1 && caseLB.firstChild.className !== this.myGame.selectedPon[0].className){
            this.myGame.enemyPon.push({
                direction : 'LB',
                elem : caseLB,
            })
            caseLB = this.positionLB(caseLB)
            if(caseLB !== null && caseLB.childElementCount===0){
                caseLB.classList.add("bg-blue")
                this.myGame.possibleMove.push({
                    direction : 'LB',
                    elem : caseLB,
                })
                if(this.myGame.selectedPon[0].className.includes('queen')===true){
                    let newCase = caseLB
                    let newCaseLB = this.positionLB(newCase)
                    for(let i=0;i<9;i++){
                        if(newCaseLB !== null && newCaseLB.childElementCount===0 && newCaseLB !== undefined){
                            newCaseLB.classList.add("bg-blue")
                            this.myGame.possibleMove.push({
                                direction : 'LB',
                                elem : newCaseLB,
                            })
                        }
                        newCaseLB = this.positionLB(newCaseLB)
                    }
                }
            }else if(caseLB === null && caseLB.childElementCount===1){
                this.myGame.enemyPon.pop()
            }
        }
        if(caseRT !== null && caseRT.childElementCount===0 && this.myGame.selectedPon[0].className.includes('j2') === false || this.myGame.selectedPon[0].className.includes('queen')===true && caseRT !== null && caseRT.childElementCount===0){
            caseRT.classList.add("bg-blue")
            this.myGame.possibleMove.push({
                direction : 'RT',
                elem : caseRT,
            })
            if(this.myGame.selectedPon[0].className.includes('queen')===true){
                let newCase = caseRT
                let newCaseRT = this.positionRT(newCase)
                for(let i=0;i<9;i++){
                    if(newCaseRT !== null && newCaseRT.childElementCount===0 && newCaseRT !== undefined){
                        newCaseRT.classList.add("bg-blue")
                        this.myGame.possibleMove.push({
                            direction : 'RT',
                            elem : newCaseRT,
                        })
                    }
                    newCaseRT = this.positionRT(newCaseRT)
                }
            }
        }else if(caseRT !== null && caseRT.childElementCount===1 && caseRT.firstChild.className !== this.myGame.selectedPon[0].className){
            this.myGame.enemyPon.push({
                direction : 'RT',
                elem : caseRT,
            })
            caseRT = this.positionRT(caseRT)
            if(caseRT !== null && caseRT.childElementCount===0){
                caseRT.classList.add("bg-blue")
                this.myGame.possibleMove.push({
                    direction : 'RT',
                    elem : caseRT,
                })
                if(this.myGame.selectedPon[0].className.includes('queen')===true){
                    let newCase = caseRT
                    let newCaseRT = this.positionRT(newCase)
                    for(let i=0;i<9;i++){
                        if(newCaseRT !== null && newCaseRT.childElementCount===0 && newCaseRT !== undefined){
                            newCaseRT.classList.add("bg-blue")
                            this.myGame.possibleMove.push({
                                direction : 'RT',
                                elem : newCaseRT,
                            })
                        }
                        newCaseRT = this.positionRT(newCaseRT)
                    }
                }
            }else if(caseRT === null || caseRT.childElementCount===1){
                this.myGame.enemyPon.pop()
            }
        }
        if(caseRB !== null && caseRB.childElementCount===0 && this.myGame.selectedPon[0].className.includes('j1') === false || this.myGame.selectedPon[0].className.includes('queen')===true && caseRB !== null && caseRB.childElementCount===0){
            caseRB.classList.add("bg-blue")
            this.myGame.possibleMove.push({
                direction:'RB',
                elem:caseRB,
            })
            if(this.myGame.selectedPon[0].className.includes('queen')===true){
                let newCase = caseRB 
                let newCaseRB = this.positionRB(newCase)
                console.log(newCase)
                console.log(newCaseRB)
                for(let i=0;i<9;i++){
                    if(newCaseRB !== null && newCaseRB.childElementCount===0 && newCaseRB !== undefined){
                        newCaseRB.classList.add("bg-blue")
                        this.myGame.possibleMove.push({
                            direction : 'RB',
                            elem : newCaseRB,
                        })
                    }
                    newCaseRB = this.positionRB(newCaseRB)
                }
            }
        }else if(caseRB !== null && caseRB.childElementCount===1 && caseRB.firstChild.className !== this.myGame.selectedPon[0].className){
            this.myGame.enemyPon.push({
                direction : 'RB',
                elem : caseRB,
            })
            caseRB = this.positionRB(caseRB)
            if(caseRB !== null && caseRB.childElementCount===0){
                caseRB.classList.add("bg-blue")
                this.myGame.possibleMove.push({
                    direction : 'RB',
                    elem : caseRB,
                })
                if(this.myGame.selectedPon[0].className.includes('queen')===true){
                    let newCase = caseRB
                    let newCaseRB = this.positionRB(newCase)
                    for(let i=0;i<9;i++){
                        if(newCaseRB !== null && newCaseRB.childElementCount===0 && newCaseRB !== undefined){
                            newCaseRB.classList.add("bg-blue")
                            this.myGame.possibleMove.push({
                                direction : 'RB',
                                elem : newCaseRB,
                            })
                        }
                        newCaseRB = this.positionRT(newCaseRB)
                    }
                }
            }else if(caseRB === null || caseRB.childElementCount===1){
                this.myGame.enemyPon.pop()
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
        if(oldCase!==null&&oldCase!==undefined){
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



