

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







// Sélection des éléments du jeu
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ajustement des dimensions pour mobile
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;

// Récupération de la difficulté choisie par l'utilisateur
const difficulty = localStorage.getItem("difficulty") || "normal";

// Paramètres ajustés selon la difficulté
const difficultySettings = {
    beginner: { speed: 1, spawnRate: 2500, lives: 7, specialRate: 0.02 },  // Moins de bulles, plus de vies
    easy: { speed: 1.2, spawnRate: 2000, lives: 5, specialRate: 0.05 },
    normal: { speed: 1.5, spawnRate: 1500, lives: 3, specialRate: 0.1 },
    hard: { speed: 2, spawnRate: 1000, lives: 2, specialRate: 0.15 }
};

const settings = difficultySettings[difficulty];

// Définition du panier
let basket = { x: canvas.width / 2 - 40, y: canvas.height - 60, width: 80, height: 20 };

// Liste des bulles
let bubbles = [];
let score = 0;
let level = 1;
let lives = settings.lives;
let coins = 0;
let bubbleSpeed = settings.speed;
let spawnRate = settings.spawnRate;
let bubbleSpecialRate = settings.specialRate;

// Chargement des sons
const popSound = new Audio('sounds/catch.mp3');
const loseSound = new Audio('sounds/lose.mp3');
const levelUpSound = new Audio('sounds/level-up.mp3');

// Déplacement avec les flèches du clavier
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && basket.x > 0) basket.x -= 20;
    else if (event.key === "ArrowRight" && basket.x < canvas.width - basket.width) basket.x += 20;
});

// Déplacement tactile (glissement du doigt)
let touchStartX = 0;
canvas.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
});

canvas.addEventListener("touchmove", (event) => {
    let touchX = event.touches[0].clientX;
    let moveDistance = touchX - touchStartX;
    basket.x += moveDistance * 0.3;
    basket.x = Math.max(0, Math.min(canvas.width - basket.width, basket.x));
    touchStartX = touchX;
});

// Fonction pour générer une bulle (moins de bulles !)
function spawnBubble() {
    let type = Math.random() < bubbleSpecialRate ? ["explosive", "slow", "boost"][Math.floor(Math.random() * 3)] : "normal";
    
    let bubble = { 
        x: Math.random() * (canvas.width - 20), 
        y: 0, 
        radius: 20, 
        speed: bubbleSpeed, 
        color: getBubbleColor(type),
        type: type
    };

    if (Math.random() < 0.5) {  // Seulement 50% de chance qu'une bulle apparaisse
        bubbles.push(bubble);
    }
}

// Définition des couleurs des bulles spéciales
function getBubbleColor(type) {
    if (type === "explosive") return "red";
    if (type === "slow") return "blue";
    if (type === "boost") return "gold";
    return "white";
}

// Mise à jour du jeu
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#64b5f6";
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);

    bubbles.forEach((bubble, index) => {
        bubble.y += bubble.speed;

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
        ctx.closePath();

        if (bubble.y > basket.y && bubble.x > basket.x && bubble.x < basket.x + basket.width) {
            if (bubble.type === "explosive") lives--;
            if (bubble.type === "slow") bubbleSpeed -= 0.1;
            if (bubble.type === "boost") coins += 5;
            else score++;

            popSound.play();
            bubbles.splice(index, 1);
        }

        if (bubble.y > canvas.height) {
            loseSound.play();
            bubbles.splice(index, 1);
            lives--;
            if (lives <= 0) {
                gameOver();
            }
        }
    });

    document.getElementById("score").innerText = score;
    document.getElementById("lives").innerText = lives;
    document.getElementById("coins").innerText = coins;
    document.getElementById("level").innerText = level;

    checkLevelUp();
}

// Fonction de changement de niveau (progression douce)
function checkLevelUp() {
    if (score >= level * 15) { // Besoin de 15 points au lieu de 10 pour monter de niveau
        level++;
        bubbleSpeed += 0.2;
        spawnRate = Math.max(800, spawnRate - 150);
        bubbleSpecialRate += 0.02;
        coins += 10;
        levelUpSound.play();
        saveScore();
    }
}

// Sauvegarde du score par difficulté
function saveScore() {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || {};
    if (!highScores[difficulty] || score > highScores[difficulty]) {
        highScores[difficulty] = score;
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }
}

// Fonction Game Over
function gameOver() {
    saveScore();
    alert("Game Over ! Score final : " + score);
    document.location.reload();
}

// Afficher le score le plus haut par difficulté
function displayHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || {};
    let scoreBoard = document.getElementById("highScores");
    if (scoreBoard) {
        scoreBoard.innerHTML = `
            <p>Débutant : ${highScores.beginner || 0} pts</p>
            <p>Moyen : ${highScores.easy || 0} pts</p>
            <p>Difficile : ${highScores.normal || 0} pts</p>
            <p>Expert : ${highScores.hard || 0} pts</p>
        `;
    }
}

// Lancer le jeu avec moins de bulles !
setInterval(spawnBubble, spawnRate + 500);  // Augmente le délai de spawn des bulles
setInterval(updateGame, 20);

// Affichage des scores au chargement
document.addEventListener("DOMContentLoaded", displayHighScores);
