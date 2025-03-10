

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





//emoji




document.addEventListener("DOMContentLoaded", function () {
    const emojiContainer = document.createElement("div");
    emojiContainer.classList.add("emoji-background");
    document.body.appendChild(emojiContainer);

    const emojis = ["🎮", "👾", "🧩", "♦️", "🎯", "🃏", "🕹️", "🎲", "🀄️", "🎴", "🎳", "♠️", "♟️"];

    function createEmoji() {
        const emojiElement = document.createElement("span");
        emojiElement.classList.add("emoji");
        emojiElement.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        // Position aléatoire
        emojiElement.style.left = Math.random() * 100 + "vw";
        emojiElement.style.animationDuration = Math.random() * 7 + 10 + "s"; // Entre 3 et 8 secondes
        emojiElement.style.fontSize = Math.random() * 10 + 10 + "px"; // Taille entre 10px et 40px

        emojiContainer.appendChild(emojiElement);

        // Supprimer l'emoji après l'animation
        setTimeout(() => {
            emojiElement.remove();
        }, 8000);
    }

    // Générer un emoji toutes les 500ms
    setInterval(createEmoji, 500);
});



