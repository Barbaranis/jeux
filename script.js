

// -------------------- MENU BURGER ------------------------
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
// -------------------- GLITTER (paillettes) ------------------------
document.addEventListener("DOMContentLoaded", function () {
    const glitterContainer = document.querySelector(".glitter");
    function createGlitter() {
        const glitter = document.createElement("span");
        const size = Math.random() * 6 + 2;
        glitter.style.width = `${size}px`;
        glitter.style.height = `${size}px`;
        glitter.style.left = `${Math.random() * 100}%`;
        glitter.style.top = `${Math.random() * 100}%`;
        glitter.style.animationDuration = `${Math.random() * 2 + 1}s`;
        glitterContainer.appendChild(glitter);
        setTimeout(() => {
            glitter.remove();
        }, 2000);
    }
    setInterval(createGlitter, 200);
});
// -------------------- EMOJIS EN FOND ------------------------
document.addEventListener("DOMContentLoaded", function () {
    const emojiContainer = document.createElement("div");
    emojiContainer.classList.add("emoji-background");
    document.body.appendChild(emojiContainer);
    const emojis = ["🎮", "👾", "🧩", "♦️", "🎯", "🃏", "🕹️", "🎲", "🀄️", "🎴", "🎳", "♠️", "♟️"];
    function createEmoji() {
        const emojiElement = document.createElement("span");
        emojiElement.classList.add("emoji");
        emojiElement.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        emojiElement.style.left = Math.random() * 100 + "vw";
        emojiElement.style.animationDuration = Math.random() * 7 + 10 + "s";
        emojiElement.style.fontSize = Math.random() * 10 + 10 + "px";
        emojiContainer.appendChild(emojiElement);
        setTimeout(() => {
            emojiElement.remove();
        }, 8000);
    }
    setInterval(createEmoji, 500);
});
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



