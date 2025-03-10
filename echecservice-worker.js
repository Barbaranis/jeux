


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










const CACHE_NAME = "chess-game-v1";
const urlsToCache = ["/", "/index.html", "/EChec.html", "/styleechec.css", "/scriptechec.js", "/move.mp3"];

self.addEventListener("install", event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener("fetch", event => {
    event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
