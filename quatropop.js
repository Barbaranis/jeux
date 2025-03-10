

// Sélection des éléments
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');




// Ouverture du menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.add('show');
    menuToggle.classList.add('active'); // Change la couleur des barres
});




// Fermeture via la croix
navMenu.addEventListener('click', (event) => {
    if (event.target.classList.contains('close-btn')) {
        navMenu.classList.remove('show');
        menuToggle.classList.remove('active'); // Réinitialise la couleur
    }
});











const coords = document.getElementById("coords");
const plateauElt = document.getElementById("plateau");
const auTourDe = document.getElementById("auTourDe");
const winBy = document.getElementById("winBy");
const endGameModel = document.getElementById("endGameModel");
const rules = document.getElementById("rules");

const scoreJ1 = document.getElementById("scoreJ1");
const scoreJ2 = document.getElementById("scoreJ2");

const bStart = document.getElementById("start");
const bRestart = document.getElementById("restart");
const bRestartTotal = document.getElementById("restartTotal");
const bClose = document.getElementById("closeBtn");
const bCloseBtnRules = document.getElementById("closeBtnRules");

const bShowScore = document.getElementById("showScore");
const rulesBtn = document.getElementById("rulesBtn");

let estfinie = false, hasStarted=false;
let strTypeJeton = new String("");

const c0 = [0, 7, 14, 21, 28, 35];
const c1 = [1, 8, 15, 22, 29, 36];
const c2 = [2, 9, 16, 23, 30, 37];
const c3 = [3, 10, 17, 24, 31, 38];
const c4 = [4, 11, 18, 25, 32, 39];
const c5 = [5, 12, 19, 26, 33, 40];
const c6 = [6, 13, 20, 27, 34, 41];


let joueur=2,cmpJ1=0,cmpJ2=0,cmpPlays=0; 

//Local Storage
const lCmpJ1 = localStorage.getItem("scoreJ1");
const lCmpJ2 = localStorage.getItem("scoreJ2");

cmpJ1 = lCmpJ1;
cmpJ2 = lCmpJ2;



if (cmpJ1===null) cmpJ1 = 0;
if (cmpJ2===null) cmpJ2 = 0;

scoreJ1.innerText = cmpJ1; 
scoreJ2.innerText = cmpJ2;

//On génère les jeton du palteaux de jeu
for (let i = 0; i < 6; i++) {
    var newRow = document.createElement("div");
    newRow.classList.add("ligne");
    for (let j = 0; j < 7; j++) {
        var newDiv = document.createElement("div");
        newDiv.classList.add("jeton");
        newRow.appendChild(newDiv);
    }
    plateauElt.appendChild(newRow);
}

const plateau = document.querySelectorAll(".jeton");

function incScore(idGagnant){
    if(idGagnant==1)cmpJ1++;
    else if(idGagnant==2)cmpJ2++;
    localStorage.setItem("scoreJ1",cmpJ1);
    localStorage.setItem("scoreJ2",cmpJ2);
    scoreJ1.innerText = cmpJ1;
    scoreJ2.innerText = cmpJ2;
}

function switchColor(){
    if (auTourDe.classList.contains("jeton_jaune")){
        auTourDe.classList.remove("jeton_jaune");
        auTourDe.classList.add("jeton_rouge");
        auTourDe.innerHTML ="Au tour du joueur 1";
        hoverBGJeton("jetonHoverRouge");
    }
    else if (auTourDe.classList.contains("jeton_rouge")){
        auTourDe.classList.remove("jeton_rouge");
        auTourDe.classList.add("jeton_jaune");
        auTourDe.innerHTML = "Au tour du joueur 2";
        hoverBGJeton("jetonHoverJaune");
    }   
}

function changePlayer() {
    if (joueur == 1){
        strTypeJeton = "jeton_jaune";
        joueur = 2;
        switchColor();
    }
    else {
        strTypeJeton ="jeton_rouge";
        joueur = 1;
        switchColor();
    }
    return joueur,strTypeJeton;
}

function clicSurJetonEstValide(jeton) {
    return (jeton.classList.contains("jeton") && !jeton.classList.contains("jeton_rouge") && !jeton.classList.contains("jeton_jaune"));
}

function hoverBGJeton(str){
    plateau.forEach(element => {
        if (clicSurJetonEstValide(element)){
            element.classList.remove("jetonHoverRouge");
            element.classList.remove("jetonHoverJaune");
            element.classList.add(str);
        } 
    });
}

function estDejaJoue(jeton){
    return (jeton.classList.contains("jeton_rouge") || jeton.classList.contains("jeton_jaune"));
}

function getColonne(i){
    if(c0.includes(i)) return c0;
    else if (c1.includes(i)) return c1;
    else if (c2.includes(i)) return c2;
    else if (c3.includes(i)) return c3;
    else if (c4.includes(i)) return c4;
    else if (c5.includes(i)) return c5;
    else if (c6.includes(i)) return c6;
}

function placeInColonne(idC,typeJeton){
    for (let index = 5; index >=0 ; index--) {
        if(estDejaJoue(plateau[idC[index]])==false) {
            plateau[idC[index]].classList.add(typeJeton);
            return idC[index];
        }
    }
}

function diagonaleDroiteValide(i) {// Celle la : /
    const noDiagD = [0,1,2,7,8,14,27,33,34,39,40,41];
    return !noDiagD.includes(i);
}

function diagonaleGaucheValide(i) {// Celle la : \
    const noDiagG = [4,5,6,12,13,20,21,28,29,35,36,37];
    return !noDiagG.includes(i);
}

function testVoisin(cmp,tmp,strTypeJeton){
    console.log("cmp "+cmp+" tmp "+tmp+" "+strTypeJeton);
    if (cmp>=4) {
        plateau[tmp].classList.contains(strTypeJeton);
        console.log("true");
        return true;
    }
    else {
        console.log("false");
        return false;
    }
}

function partieEstGagnée(id,strtypeJeton) {
    console.log("----------------------");
    //Horizontalement
    let tmp=id,cmpVoisin=-1;
    while (plateau[tmp].classList.contains(strTypeJeton) ) {
        cmpVoisin++;
        if (tmp!=41){
            tmp++;
        }
        else{
            break;
        }
    }
    tmp = id;
    while (plateau[tmp].classList.contains(strTypeJeton) ) {
        cmpVoisin++;
        if (tmp!=0){
            tmp--;
        }
        else{
            break;
        }
    }
    if (testVoisin(cmpVoisin,tmp,strTypeJeton)){
        return true;
    }
    //Verticalement en bas car impossible en haut
    tmp = id, cmpVoisin = 0;
    while(plateau[tmp].classList.contains(strTypeJeton) ){
        cmpVoisin++;
        if(tmp < 35){
            tmp+=7;
        }
        else{
            break;
        }
    }
    if (testVoisin(cmpVoisin,tmp,strTypeJeton)) return true;

    tmp = id, cmpVoisin = 0;
    if(diagonaleDroiteValide(tmp)){
        while(plateau[tmp].classList.contains(strTypeJeton)){ //Diagonale /
            cmpVoisin++;
            if  (tmp > 6 && !c6.includes(tmp)){
                tmp-=6;
            }
            else{
                break;
            }
        }
        if (testVoisin(cmpVoisin,tmp,strTypeJeton))return true;
        console.log("after first diag right "+cmpVoisin);
        tmp = id;
        --cmpVoisin;
        while(plateau[tmp].classList.contains(strTypeJeton)){
            cmpVoisin++;
            if  (tmp < 35 && !c0.includes(tmp)){
                tmp+=6;
            }
            else{
                break;
            }
        }
        console.log(cmpVoisin);
        if (testVoisin(cmpVoisin,tmp,strTypeJeton)) return true;
    }

    tmp = id, cmpVoisin = 0;
    if (diagonaleGaucheValide(tmp)){
        while(plateau[tmp].classList.contains(strTypeJeton)){// diagonale \
            cmpVoisin++;
            if  (tmp > 7 && !c0.includes(tmp)){
                tmp-=8;
            }
            else{
                break;
            }
        }
        if (testVoisin(cmpVoisin,tmp,strTypeJeton)) return true;
        tmp = id;
        --cmpVoisin;
        while(plateau[tmp].classList.contains(strTypeJeton)){
            cmpVoisin++;
            if  (tmp < 35 && !c6.includes(tmp)){
                tmp+=8;
            }
            else{
                break;
            }
        }
        if (testVoisin(cmpVoisin,tmp,strTypeJeton)) return true;
    }
}

rulesBtn.addEventListener('click',()=>{
    rules.style.display ="flex";
});

bShowScore.addEventListener('click',()=>{
    endGameModel.style.display ="flex";
});

bClose.addEventListener('click',()=>{
    endGameModel.style.display = "none";
});

bCloseBtnRules.addEventListener('click',()=>{
    rules.style.display = "none";
});


function restart(){
    auTourDe.classList.remove("active");localStorage.clear();
    auTourDe.innerHTML = "Au tour du joueur 1";
    auTourDe.classList.remove("jeton_jaune");
    auTourDe.classList.add("jeton_rouge");
    auTourDe.style.display = "inline";
    hoverBGJeton("jetonHoverRouge");
    joueur = 2;
    plateau.forEach(element => {
        if(element.classList.contains("jeton_rouge")){
            element.classList.remove("jeton_rouge");
        }
        else if (element.classList.contains("jeton_jaune")){
            element.classList.remove("jeton_jaune");
        }
    });
    estfinie = false;
}

function restartTotal(){
    restart();
    cmpJ1=0,cmpJ2=0;
    scoreJ1.innerHTML = cmpJ1;
    scoreJ2.innerHTML = cmpJ2;
    localStorage.setItem("scoreJ1",cmpJ1);
    localStorage.setItem("scoreJ2",cmpJ2);
}

bStart.addEventListener('click',()=>{
    restart();
    bStart.style.display ="none";
    auTourDe.style.display ="inline";
    estfinie = false;
    hasStarted = true;
});

bRestart.addEventListener('click',()=>{
    restart();
    endGameModel.style.display = "none";
    bStart.style.display = "none";
    winBy.style.display = "none";
});

bRestartTotal.addEventListener('click',()=>{
    restartTotal();
    winBy.style.display = "none";
    endGameModel.style.display = "none";
    hasStarted = true;
    bStart.style.display = "none";

});

plateauElt.addEventListener('click',function(click){
    let i,newId;
    const jeton = document.elementFromPoint(click.clientX,click.clientY);
    if (!estfinie && hasStarted && clicSurJetonEstValide(jeton)){
        for (i = 0; i < plateau.length; i++) {
            if(plateau[i]===document.elementFromPoint(click.clientX,click.clientY)){
                cmpPlays++;
                joueur,strTypeJeton = changePlayer(joueur);
                newId = placeInColonne(getColonne(i),strTypeJeton);
                if(partieEstGagnée(newId,strTypeJeton)){
                    incScore(joueur);
                    switchColor();
                    winBy.innerHTML = "Partie gagnée par Joueur"+joueur+"";
                    winBy.classList.remove("jeton_rouge");
                    winBy.classList.remove("jeton_jaune");
                    winBy.classList.add(strTypeJeton);
                    winBy.style.display = "inline";
                    bRestart.style.display = "inline";
                    bRestartTotal.style.display ="inline";
                    endGameModel.style.display = "flex";
                    estfinie = true;
                }
                break;
            }
        }//Egalite
        if (cmpPlays==42) {
            winBy.innerHTML = "C'est une égalité";
            winBy.style.display = "inline";
            bRestart.style.display = "inline";
            bRestartTotal.style.display ="inline";
            endGameModel.style.display = "flex";
            estfinie = true;
        }
    }
});