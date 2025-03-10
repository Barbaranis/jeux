


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












// Fonction pour afficher/masquer le menu mobile
function toggleMenu() {
    let menu = document.getElementById("mobile-menu");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

// Ajout du support clavier pour l'accessibilité
document.addEventListener("keydown", function(event) {
    if (event.key === "Tab") {
        let menuLinks = document.querySelectorAll(".nav-links a");
        menuLinks.forEach(link => link.setAttribute("tabindex", "0"));
    }
});

// Accessibilité ARIA
document.addEventListener("DOMContentLoaded", function() {
    let levelElement = document.getElementById("level");
    if (levelElement) {
        levelElement.setAttribute("aria-live", "polite");
    }

    let scoreElement = document.getElementById("score");
    if (scoreElement) {
        scoreElement.setAttribute("aria-live", "polite");
    }
});

// Animation du logo au survol
const logo = document.querySelector(".logo img");
if (logo) {
    logo.addEventListener("mouseover", function() {
        logo.style.transform = "scale(1.1)";
    });

    logo.addEventListener("mouseout", function() {
        logo.style.transform = "scale(1)";
    });
}

// Changement de couleur du header en fonction du scroll
window.addEventListener("scroll", function() {
    let header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.style.background = "rgba(100, 181, 246, 0.8)";
    } else {
        header.style.background = "rgba(100, 181, 246, 1)";
    }
});

