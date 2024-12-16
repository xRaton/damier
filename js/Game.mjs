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
                pion.addEventListener('click',(ev)=>{
                    let whatPlayerPlayNow = this.currentTour % 2 === 0 ? "j1" : "j2"
                    if(whatPlayerPlayNow === 'j1'){
                        this.preMove(ev)
                    }
                })
                this.ponJ1.push(pion)
            }
            else if(this.case[i].id.slice(-1)<4){
                let piece = new Pion (this.case)
                let pion = piece.createPon(i,"j2")
                pion.addEventListener('click',(ev)=>{
                    let whatPlayerPlayNow = this.currentTour % 2 === 0 ? "j1" : "j2"
                    if(whatPlayerPlayNow === 'j2'){
                        this.preMove(ev)
                    }
                })
                this.ponJ2.push(pion)
            }
        }
    }
    preMove (ev) {
        for(let i=0;i<document.getElementsByClassName("col").length;i++){
            document.getElementsByClassName("col")[i].classList.remove('bg-blue')
        }
        this.selectedPon=[]
        this.selectedPon.push(ev.target)
        let position = ev.target.parentElement
        this.caseLibre(position)
    }
    
    caseLibre(position){
        /* check les cases alentours*/
        /* case droite/haut */
        let caseRT = this.checkCaseRT(position)
        /* case  droite/bas */
        let caseRB = this.checkCaseRB(position)
        /* case gauche/haut */
        let caseLT = this.checkCaseLT(position)
        /* case gauche/bas */
        let caseLB = this.checkCaseLB(position)
        for(let i=0;i<document.getElementsByClassName("col").length;i++){
            document.getElementsByClassName("col")[i].classList.remove('bg-blue')
        }
        this.enemyPon=[]
        this.possibleMove=[]
        console.log(this.enemyPon)
        if(caseRT!==null && caseRT!==undefined && caseRT.childElementCount===0 && this.selectedPon[0].className.includes('j1')=== true||caseRT!==null && caseRT!==undefined && caseRT.childElementCount===0 && this.selectedPon[0].id==='queen'){
            caseRT.classList.add('bg-blue')
            this.possibleMove.push({
                direction : 'RT',
                elem : caseRT,
            })
            if(this.selectedPon[0].id==='queen'){
                this.initLoopRT(caseRT)
            }
        }else if(caseRT!==null && caseRT!==undefined && caseRT.childElementCount===1){
            if(this.selectedPon[0].className===caseRT.firstElementChild.className){
                
            }else{
                this.enemyPon.push({
                    direction : 'RT',
                    elem : caseRT
                })
                caseRT = this.checkCaseRT(caseRT)
                if(caseRT!==null && caseRT!==undefined && caseRT.childElementCount===0){
                    caseRT.classList.add('bg-blue')
                    this.possibleMove.push({
                        direction : 'RT',
                        elem : caseRT
                    })
                    if(this.selectedPon[0].id==='queen'){
                        this.initLoopRT(caseRT)
                    }
                }else if(caseRT===null || caseRT===undefined || caseRT.childElementCount===1){
                    this.enemyPon.pop()
                }
            } 
        }       
        if(caseRB!==null && caseRB!==undefined && caseRB.childElementCount===0 && this.selectedPon[0].className.includes('j2')=== true||caseRB!==null && caseRB!==undefined && caseRB.childElementCount===0 && this.selectedPon[0].id==='queen'){
            caseRB.classList.add('bg-blue')
            this.possibleMove.push({
                direction : 'RB',
                elem : caseRB,
            })
            if(this.selectedPon[0].id==='queen'){
                this.initLoopRB(caseRB)
            }
        }else if(caseRB!==null && caseRB!==undefined && caseRB.childElementCount===1){
            if(this.selectedPon[0].className===caseRB.firstElementChild.className){
                
            }else{
                this.enemyPon.push({
                    direction : 'RB',
                    elem : caseRB
                })
                caseRB = this.checkCaseRB(caseRB)
                if(caseRB!==null && caseRB!==undefined && caseRB.childElementCount===0){
                    caseRB.classList.add('bg-blue')
                    this.possibleMove.push({
                        direction : 'RB',
                        elem : caseRB
                    })
                    if(this.selectedPon[0].id==='queen'){
                        this.initLoopRB(caseRB)
                    }
                }else if(caseRB===null || caseRB===undefined || caseRB.childElementCount===1){
                    this.enemyPon.pop()
                }
            }
        }
        if(caseLT!==null && caseLT!==undefined && caseLT.childElementCount===0 && this.selectedPon[0].className.includes('j1')=== true||caseLT!==null && caseLT!==undefined && caseLT.childElementCount===0 && this.selectedPon[0].id==='queen'){
            caseLT.classList.add('bg-blue')
            this.possibleMove.push({
                direction : 'LT',
                elem : caseLT,
            })
            if(this.selectedPon[0].id==='queen'){
                this.initLoopLT(caseLT)
            }
        }else if(caseLT!==null && caseLT!==undefined && caseLT.childElementCount===1){
            if(this.selectedPon[0].className===caseLT.firstElementChild.className){
                
            }else{
                this.enemyPon.push({
                    direction : 'LT',
                    elem : caseLT
                })
                caseLT = this.checkCaseLT(caseLT)
                if(caseLT!==null && caseLT!==undefined && caseLT.childElementCount===0){
                    caseLT.classList.add('bg-blue')
                    this.possibleMove.push({
                        direction : 'LT',
                        elem : caseLT
                    })
                    if(this.selectedPon[0].id==='queen'){
                        this.initLoopLT(caseLT)
                    }
                }else if(caseLT===null || caseLT===undefined || caseLT.childElementCount===1){
                    this.enemyPon.pop()
                }
            } 
        }
        if(caseLB!==null && caseLB!==undefined && caseLB.childElementCount===0 && this.selectedPon[0].className.includes('j2')=== true||caseLB!==null && caseLB!==undefined && caseLB.childElementCount===0 && this.selectedPon[0].id==='queen'){
            caseLB.classList.add('bg-blue')
            this.possibleMove.push({
                direction : 'LB',
                elem : caseLB,
            })
            if(this.selectedPon[0].id==='queen'){
                this.initLoopLB(caseLB)
            }
        }else if(caseLB!==null && caseLB!==undefined && caseLB.childElementCount===1){
            if(this.selectedPon[0].className===caseLB.firstElementChild.className){
                
            }else{
                this.enemyPon.push({
                    direction : 'LB',
                    elem : caseLB
                })
                caseLB = this.checkCaseLB(caseLB)
                if(caseLB!==null && caseLB!==undefined && caseLB.childElementCount===0){
                    caseLB.classList.add('bg-blue')
                    this.possibleMove.push({
                        direction : 'LB',
                        elem : caseLB
                    })
                    if(this.selectedPon[0].id==='queen'){
                        this.initLoopLB(caseLB)
                    }
                }else if(caseLB===null || caseLB===undefined || caseLB.childElementCount===1){
                    this.enemyPon.pop()
                }
            }
        }
    }
    initLoopRT(newCase){
        if(newCase!==null && newCase!==undefined && newCase.childElementCount===0){
            newCase.classList.add('bg-blue')
            this.possibleMove.push({
                direction : 'RT',
                elem : newCase,
            })
            this.loopCaseRT(newCase)
        }else if(newCase!==null && newCase!==undefined && newCase.childElementCount===1){
            if(this.selectedPon[0].className===newCase.firstElementChild.className){
                
            }else{
                this.enemyPon.push({
                    direction : 'RT',
                    elem : newCase
                })
                newCase = this.checkCaseRT(newCase)
                if(newCase!==null && newCase!==undefined && newCase.childElementCount===0){
                    newCase.classList.add('bg-blue')
                    this.possibleMove.push({
                        direction : 'RT',
                        elem : newCase
                    })
                    this.loopCaseRT(newCase)
                }else if(newCase===null||newCase===undefined||newCase.childElementCount===1){
                    this.enemyPon.pop()
                    return
                }
            } 
        }else return 
    }
    initLoopRB(newCase){
        if(newCase!==null && newCase!==undefined && newCase.childElementCount===0){
            newCase.classList.add('bg-blue')
            this.possibleMove.push({
                direction : 'RB',
                elem : newCase,
            })
            this.loopCaseRB(newCase)
        }else if(newCase!==null && newCase!==undefined && newCase.childElementCount===1){
            if(this.selectedPon[0].className===newCase.firstElementChild.className){
                
            }else{
                this.enemyPon.push({
                    direction : 'RB',
                    elem : newCase
                })
                caseRB = this.checkCaseRB(newCase)
                if(newCase!==null && caseRB!==undefined && newCase.childElementCount===0){
                    newCase.classList.add('bg-blue')
                    this.possibleMove.push({
                        direction : 'RB',
                        elem : newCase
                    })
                    this.loopCaseRB(newCase)
                }else if(newCase===null || newCase===undefined || newCase.childElementCount===1){
                    this.enemyPon.pop()
                    return
                }
            }
        }else return 
    }
    initLoopLT(newCase){
        if(newCase!==null && newCase!==undefined && newCase.childElementCount===0){
            newCase.classList.add('bg-blue')
            this.possibleMove.push({
                direction : 'LT',
                elem : newCase,
            })
            this.loopCaseLT(newCase)
        }if(newCase!==null && newCase!==undefined && newCase.childElementCount===1){
            if(this.selectedPon[0].className===newCase.firstElementChild.className){
                
            }else{
                this.enemyPon.push({
                    direction : 'LT',
                    elem : newCase
                })
                newCase = this.checkCaseLT(newCase)
                if(newCase!==null && newCase!==undefined && newCase.childElementCount===0){
                    newCase.classList.add('bg-blue')
                    this.possibleMove.push({
                        direction : 'LT',
                        elem : newCase
                    })
                    this.loopCaseLT(newCase)
                }else if(newCase===null || newCase===undefined || newCase.childElementCount===1){
                    this.enemyPon.pop()
                    return
                }
            } 
        }else return 
    }
    initLoopLB(newCase){
        if(newCase!==null && newCase!==undefined && newCase.childElementCount===0){
            newCase.classList.add('bg-blue')
            this.possibleMove.push({
                direction : 'LB',
                elem : newCase,
            })
            this.loopCaseLB(newCase)
        }if(newCase!==null && newCase!==undefined && newCase.childElementCount===1){
            if(this.selectedPon[0].className===newCase.firstElementChild.className){
                
            }else{
                this.enemyPon.push({
                    direction : 'LB',
                    elem : newCase
                })
                newCase = this.checkCaseLB(newCase)
                if(newCase!==null && newCase!==undefined && newCase.childElementCount===0){
                    newCase.classList.add('bg-blue')
                    this.possibleMove.push({
                        direction : 'LB',
                        elem : newCase
                    })
                    this.loopCaseLB(newCase)
                }else if(newCase===null || newCase===undefined || newCase.childElementCount===1){
                    this.enemyPon.pop()
                    return
                }
            }
        }else return 
    }
    loopCaseRT(oldCase) {
        if(oldCase!== undefined && oldCase!== null){
            let y = oldCase.id.slice(-1)
            let x = oldCase.id.slice(0,1)
            let newCase = document.getElementById((parseInt(x)+1)+'-'+(parseInt(y)-1))
            if(newCase!==null&&newCase!==undefined){
                this.initLoopRT(newCase)
            }else return
        }else return
    }
    loopCaseRB(oldCase){
        if(oldCase!== undefined && oldCase!== null){
            let y = oldCase.id.slice(-1)
            let x = oldCase.id.slice(0,1)
            let newCase = document.getElementById((parseInt(x)+1)+'-'+(parseInt(y)+1))
            if(newCase!==null&&newCase!==undefined){
                this.initLoopRB(newCase)
            }else return
        }else return
    }
    loopCaseLT(oldCase){
        if(oldCase!== undefined && oldCase!== null){
            let y = oldCase.id.slice(-1)
            let x = oldCase.id.slice(0,1)
            let newCase = document.getElementById((parseInt(x)-1)+'-'+(parseInt(y)-1))
            if(newCase!==null&&newCase!==undefined){
                this.initLoopLT(newCase)
            }else return
        }else return
    }
    loopCaseLB(oldCase){
        if(oldCase!== undefined && oldCase!== null){
            let y = oldCase.id.slice(-1)
            let x = oldCase.id.slice(0,1)
            let newCase = document.getElementById((parseInt(x)-1)+'-'+(parseInt(y)+1))
            if(newCase!==null&&newCase!==undefined){
                this.initLoopLB(newCase)
            }else return
        }else return
    }
    checkCaseRT(oldCase){
        if(oldCase!== undefined && oldCase!== null){
            let y = oldCase.id.slice(-1)
            let x = oldCase.id.slice(0,1)
            let newCase = document.getElementById((parseInt(x)+1)+'-'+(parseInt(y)-1))
            return newCase
        }else console.log('pas possible')
    }
    checkCaseRB(oldCase){
        if(oldCase!== undefined && oldCase!== null){
            let y = oldCase.id.slice(-1)
            let x = oldCase.id.slice(0,1)
            let newCase = document.getElementById((parseInt(x)+1)+'-'+(parseInt(y)+1))
            return newCase
        }else console.log('pas possible')
    }
    checkCaseLT(oldCase){
        if(oldCase!== undefined && oldCase!== null){
            let y = oldCase.id.slice(-1)
            let x = oldCase.id.slice(0,1)
            let newCase = document.getElementById((parseInt(x)-1)+'-'+(parseInt(y)-1))
            return newCase
        }else console.log('pas possible')
    }
    checkCaseLB(oldCase){
        if(oldCase!== undefined && oldCase!== null){
            let y = oldCase.id.slice(-1)
            let x = oldCase.id.slice(0,1)
            let newCase = document.getElementById((parseInt(x)-1)+'-'+(parseInt(y)+1))
            return newCase
        }else console.log('pas possible')
    }
    move(i){
        this.case[i].addEventListener('click',(ev)=>{
            if(this.selectedPon.length>0){
                if(ev.target.className.includes('bg-blue')===true){
                    this.selectedPon[0].parentElement.innerHTML=''
                    ev.target.appendChild(this.selectedPon[0])
                    if(this.enemyPon.length>0){
                        let enemyToMiam = this.selectEnemyPon(ev)
                        if (enemyToMiam !== undefined && enemyToMiam!==null){
                            this.miam(enemyToMiam)
                            if(this.selectedPon[0].className.includes('j1') && ev.target.id.slice(-1)<1){
                                this.selectedPon[0].id='queen'
                                this.endTurn()
                                for(let i=0;i<document.getElementsByClassName("col").length;i++){
                                    document.getElementsByClassName("col")[i].classList.remove('bg-blue')
                                }
                            }else if(this.selectedPon[0].className.includes('j2') && ev.target.id.slice(-1)>8){
                                this.selectedPon[0].id='queen'
                                this.endTurn()
                                for(let i=0;i<document.getElementsByClassName("col").length;i++){
                                    document.getElementsByClassName("col")[i].classList.remove('bg-blue')
                                }
                            }else {
                                this.caseLibre(ev.target)
                            }
                            if(this.enemyPon.length===0){
                                this.endTurn()
                                for(let i=0;i<document.getElementsByClassName("col").length;i++){
                                    document.getElementsByClassName("col")[i].classList.remove('bg-blue')
                                }
                                if(this.ponJ1.length<1||this.ponJ2.length<1){
                                    if(this.ponJ1.length<1){
                                        console.log('J2 , you win')
                                    }else if (this.ponJ2.length<1){
                                        console.log('J1 , you win')
                                    }
                                }
                            }
                        }else if(this.selectedPon[0].className.includes('j1') && ev.target.id.slice(-1)<1){
                            this.selectedPon[0].id='queen'
                            this.endTurn()
                            for(let i=0;i<document.getElementsByClassName("col").length;i++){
                                document.getElementsByClassName("col")[i].classList.remove('bg-blue')
                            }
                        }else if(this.selectedPon[0].className.includes('j2') && ev.target.id.slice(-1)>8){
                            this.selectedPon[0].id='queen'
                            this.endTurn()
                            for(let i=0;i<document.getElementsByClassName("col").length;i++){
                                document.getElementsByClassName("col")[i].classList.remove('bg-blue')
                            }
                        }else {
                            this.endTurn()
                            for(let i=0;i<document.getElementsByClassName("col").length;i++){
                                document.getElementsByClassName("col")[i].classList.remove('bg-blue')
                            }
                        }
                    }else if(this.selectedPon[0].className.includes('j1') && ev.target.id.slice(-1)<1){
                        this.selectedPon[0].id = 'queen'
                        this.endTurn()
                        for(let i=0;i<document.getElementsByClassName("col").length;i++){
                            document.getElementsByClassName("col")[i].classList.remove('bg-blue')
                        }
                    }else if(this.selectedPon[0].className.includes('j2') && ev.target.id.slice(-1)>8){
                        this.selectedPon[0].id = "queen"
                        this.endTurn()
                        for(let i=0;i<document.getElementsByClassName("col").length;i++){
                            document.getElementsByClassName("col")[i].classList.remove('bg-blue')
                        }
                    }else {
                        this.endTurn()
                        for(let i=0;i<document.getElementsByClassName("col").length;i++){
                            document.getElementsByClassName("col")[i].classList.remove('bg-blue')
                        }
                    }
                }
            }else console.log('case vide')
        })
    }
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
}
