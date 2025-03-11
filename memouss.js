// ---------------------- VARIABLES GÉNÉRALES ------------------------
const memoryGame = document.querySelector('.memory-game');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');
const nextLevelBtn = document.getElementById('next-level-btn');
const startGameBtn = document.getElementById('start-game-btn');
const scoreDisplay = document.getElementById('score');
const bestScoreDisplay = document.getElementById('best-score');
const timeDisplay = document.getElementById('time-remaining');
const levelDisplay = document.getElementById('level-display');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');


// ---------------------- VARIABLES DU JEU ------------------------
let flippedCards = []; // Liste temporaire des cartes retournées
let lockBoard = false; // Bloque le jeu pendant la vérification d'une paire
let score = 0;
let bestScore = 0;
let level = 1;
let pairsFound = 0;
let totalPairs;
let timeRemaining;
let timer;


// ---------------------- SONS ------------------------
let backgroundMusic = new Audio('ChansonfondMemory.wav');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.4;
let isMusicPlaying = false;


let flipSound = new Audio('Retournerunecartememory.wav');
let matchSound = new Audio('bonnepairememory_DpgrqNjq.wav');
let failSound = new Audio('sounds/fail.mp3');
let winSound = new Audio('Victoirememory.wav');



// ---------------------- GESTION DE LA MUSIQUE ------------------------
function playMusic() {
    if (!isMusicPlaying) {
        backgroundMusic.play();
        isMusicPlaying = true;
    }
}


// ---------------------- MENU BURGER ------------------------
menuToggle.addEventListener('click', () => {
    navMenu.classList.add('show');
    menuToggle.classList.add('active');
});


navMenu.addEventListener('click', (event) => {
    if (event.target.classList.contains('close-btn')) {
        navMenu.classList.remove('show');
        menuToggle.classList.remove('active');
    }
});




// ---------------------- DÉMARRER LE JEU ------------------------
startGameBtn.addEventListener('click', startGame);


function startGame() {
    playMusic(); // Lancer la musique
    pairsFound = 0; // Réinitialiser les paires trouvées
    setLevelTimer(); // Définir le temps en fonction du niveau
    startGameBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    nextLevelBtn.style.display = 'none';
    message.textContent = '';
    generateCards(); // Créer les cartes du niveau
    startTimer(); // Démarrer le chrono
}


// ---------------------- GÉNÉRATION DES CARTES ------------------------
function generateCards() {
    memoryGame.innerHTML = ''; // Vider l'ancien jeu


    const emojis = ["🐰", "🐱", "🦋", "🐣", "🐥", "🐨", "🐙", "🐤", "🐸", "🐵", "🦄", "🐻", "🐺", "🦊", "🐯", "🦁", "🐮", "🐷", "🐭", "🐹"];
    let pairsCount = 2 + Math.floor(level / 2); // Plus de paires à chaque niveau
    let selectedEmojis = emojis.slice(0, pairsCount);
    let pairs = [...selectedEmojis, ...selectedEmojis]; // Doubler pour créer les paires


    totalPairs = selectedEmojis.length;
    pairs.sort(() => Math.random() - 0.5); // Mélanger les cartes


    // Créer chaque carte
    pairs.forEach(emoji => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.textContent = emoji;
        memoryGame.appendChild(card);
    });


    // Temps d'affichage initial avant de cacher les cartes
    let revealTime = level >= 7 ? 1000 : 2000;


    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('hidden');
            card.textContent = '';
            card.addEventListener('click', () => flipCard(card)); // Lier le clic
        });
    }, revealTime);
}


// ---------------------- FLIP DES CARTES ------------------------
function flipCard(card) {
    if (lockBoard) return; // Bloquer si 2 cartes sont déjà retournées
    if (flippedCards.includes(card)) return; // Empêcher de cliquer 2x sur la même carte


    flipSound.play(); // Son de retournement
    card.textContent = card.dataset.emoji;
    card.classList.remove('hidden');
    flippedCards.push(card);


    if (flippedCards.length === 2) {
        lockBoard = true; // Bloquer pendant la comparaison
        setTimeout(checkForMatch, 800); // Comparer après un court délai
    }
}


// ---------------------- VÉRIFICATION DES PAIRES ------------------------
function checkForMatch() {
    let [card1, card2] = flippedCards;


    if (card1.dataset.emoji === card2.dataset.emoji) {
        // Si c'est une bonne paire
        matchSound.play();
        card1.classList.add('matched');
        card2.classList.add('matched');
        pairsFound++;


        if (pairsFound === totalPairs) {
            winLevel(); // Niveau gagné !
        }
    } else {
        // Si ce n'est pas une paire
        failSound.play();
        setTimeout(() => {
            card1.textContent = "";
            card2.textContent = "";
            card1.classList.add('hidden');
            card2.classList.add('hidden');
        }, 1000);
    }


    // Réinitialiser les cartes retournées
    flippedCards = [];
    lockBoard = false;
}


// ---------------------- VICTOIRE DU NIVEAU ------------------------
function winLevel() {
    message.textContent = `🎉 Bravo ! Niveau ${level} terminé !`;
    score += 2;
    scoreDisplay.textContent = `Score : ${score}`;


    if (score > bestScore) {
        bestScore = score;
        bestScoreDisplay.textContent = `Meilleur score : ${bestScore}`;
    }


    clearInterval(timer);


    if (level < 15) {
        nextLevelBtn.style.display = 'block'; // Bouton suivant
    } else {
        message.textContent = "🎉 Félicitations ! Tu as terminé le jeu !";
        nextLevelBtn.style.display = 'none';
        restartBtn.style.display = 'block';
    }
}


// ---------------------- PASSER AU NIVEAU SUIVANT ------------------------
nextLevelBtn.addEventListener('click', () => {
    if (level < 15) {
        level++;
        levelDisplay.textContent = `Niveau : ${level}`;
        startGame();
    }
});


// ---------------------- RECOMMENCER LE JEU ------------------------
restartBtn.addEventListener('click', () => {
    level = 1;
    score = 0;
    pairsFound = 0;
    scoreDisplay.textContent = 'Score : 0';
    levelDisplay.textContent = 'Niveau : 1';
    timeRemaining = 80;
    timeDisplay.textContent = 'Temps restant : 01:20';
    restartBtn.style.display = 'none';
    startGame();
});


// ---------------------- GESTION DU TEMPS ------------------------
function setLevelTimer() {
    let levelTime = [80, 70, 60, 50, 45, 45, 40, 40, 35, 35, 30, 30, 25, 25, 20];
    timeRemaining = levelTime[level - 1] || 15; // Temps selon niveau


    updateTimerDisplay();
}


function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
}


function updateTimerDisplay() {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    timeDisplay.textContent = `Temps restant : ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}


// ---------------------- FIN DU TEMPS ------------------------
function gameOver() {
    message.textContent = '⏳ Temps écoulé !';
    restartBtn.style.display = 'inline';
    nextLevelBtn.style.display = 'none';
}










// -------------------- SECURITÉ FRONT-END ------------------------
// 1. Sécurisation des liens vers les jeux (anti hack via console)
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const allowedGames = [
            'memoussregledujeu.html',
            'bubblepopregledujeu.html',
            'echecregledujeu.html',
            'chatregledujeu.html',
            'quatropop.html'
        ];
        const link = card.getAttribute('href');
        if (!allowedGames.includes(link)) {
            e.preventDefault(); // Bloque le lien
            alert('Ce lien n\'est pas autorisé !');
        }
    });
});
// 2. Vérification des images (protection contre modification via console)
document.querySelectorAll('.game-card img').forEach(img => {
    const allowedImages = [
        'memoussimg.webp',
        'bubblepop.webp',
        'echecsimg.webp',
        'attrapeleschats.webp',
        'Quatropopimgg.webp'
    ];
    if (!allowedImages.includes(img.getAttribute('src'))) {
        console.warn('Image non autorisée détectée et supprimée : ', img.getAttribute('src'));
        img.remove(); // Supprime l'image douteuse
    }
});
// 3. Protection contre manipulation via console (exemple pour les variables globales comme score)
Object.defineProperty(window, 'score', {
    get() {
        console.warn('⚠️ Le score ne peut pas être lu ou modifié via la console.');
        return 0;
    },
    set(value) {
        console.warn('⚠️ Tentative de triche bloquée.');
    }
});



