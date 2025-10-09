const CACHE_NAME = "children-skill-edu-v1";
const urlsToCache = [
  "/children-skill-edu/",
  "/children-skill-edu/index.html",
  "/children-skill-edu/manifest.json"
];

// Instalează și cachează fișierele principale
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activează și curăță versiunile vechi de cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptează cererile și răspunde din cache dacă e offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});