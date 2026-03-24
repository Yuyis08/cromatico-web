const CACHE_NAME = "cromatico-v2";

const urlsToCache = [
  "./",
  "./index.html",
  "./about.html",
  "./contacto.html",
  "./catalogo.html",

  "./css/design.css",
  "./css/diseño.css",
  "./css/contacto.css",
  "./css/styles.css",

  "./script.js",
  "./manifest.json",

  "./resize-icono/icono-192.png",
  "./resize-icono/icono-512.png"
];

// INSTALAR
self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ACTIVAR
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// FETCH
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});