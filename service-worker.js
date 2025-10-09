self.addEventListener('install', function(event) {
  console.log('Service Worker installing.');
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activated.');
});

self.addEventListener('fetch', function(event) {
  // Permite funcționarea offline de bază
  event.respondWith(fetch(event.request).catch(() => new Response("Offline")));
});