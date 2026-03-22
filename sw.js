/* ============================================================
   SERVICE WORKER - Batarelle J2
   Permet le fonctionnement HORS LIGNE (offline)
   Les données sont dans localStorage, l'app fonctionne sans réseau
   ============================================================ */

const CACHE_NAME = 'batarelle-j2-v1';

// Ressources à mettre en cache au premier chargement
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap'
];

/* Installation : mise en cache des ressources essentielles */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

/* Activation : suppression des anciens caches */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

/* Fetch : stratégie Cache First puis Network */
self.addEventListener('fetch', event => {
  // Ignorer les requêtes non-GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      // Pas en cache → réseau
      return fetch(event.request)
        .then(response => {
          // Mettre en cache la réponse pour la prochaine fois
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Hors ligne et pas en cache : retourner la page principale
          return caches.match('/index.html');
        });
    })
  );
});
