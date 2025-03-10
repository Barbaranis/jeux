

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







// Variables globales
let score = 0;
let timer = 30;
let gameInterval;
let spawnInterval;

// Démarrer le jeu
document.getElementById('startButton').addEventListener('click', startGame);

// Démarrer un nouveau jeu
function startGame() {
    score = 0;
    timer = 30;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timer;
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('gamePage').style.display = 'block';
    startTimer();
    spawnCatsAndBombs();
}

// Lancer le timer
function startTimer() {
    gameInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').textContent = timer;
        if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

// Ajouter des chats et des bombes
function spawnCatsAndBombs() {
    spawnInterval = setInterval(() => {
        if (timer <= 0) {
            clearInterval(spawnInterval);
            return;
        }
        let randomX = Math.random() * (document.getElementById('gameArea').offsetWidth - 60);
        let randomY = Math.random() * (document.getElementById('gameArea').offsetHeight - 60);
        let isBomb = Math.random() < 0.4; // 20% de chance que ce soit une bombe

        let element = document.createElement('div');
        element.classList.add(isBomb ? 'bomb' : 'cat');
        element.style.left = `${randomX}px`;
        element.style.top = `${randomY}px`;

        element.addEventListener('click', () => {
            if (isBomb) {
                endGame();
            } else {
                score += 2;
                document.getElementById('score').textContent = score;
            }
            element.remove();
        });

        document.getElementById('gameArea').appendChild(element);
        element.style.animation = 'moveCat 1s ease infinite';
    }, 1500);
}

// Fin du jeu
function endGame() {
    clearInterval(gameInterval);
    clearInterval(spawnInterval);
    document.getElementById('endGameButton').style.display = 'block';
    document.getElementById('endGameButton').addEventListener('click', () => {
        document.getElementById('gamePage').style.display = 'none';
        document.getElementById('homePage').style.display = 'block';
 document.getElementById('endGameButton').style.display = 'none';
});
}

// Rejouer sans recharger la page
document.getElementById('endGameButton').addEventListener('click', () => {
document.getElementById('gamePage').style.display = 'none';
document.getElementById('homePage').style.display = 'block';
});
