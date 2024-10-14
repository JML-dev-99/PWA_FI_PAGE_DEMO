const CACHE_NAME = 'my-pwa-cache';
const urlsToCache = [
    '/PWA_FI_PAGE_DEMO/index.html',
    '/PWA_FI_PAGE_DEMO/Css/Mystyle.css',
    '/PWA_FI_PAGE_DEMO/JS/app.js',
    '/PWA_FI_PAGE_DEMO/Asset/Icon/icon-72x72.png',
    '/PWA_FI_PAGE_DEMO/Asset/Icon/icon-96x96.png',
    '/PWA_FI_PAGE_DEMO/Asset/Icon/icon-128x128.png',
    '/PWA_FI_PAGE_DEMO/Asset/Icon/icon-144x144.png',
    '/PWA_FI_PAGE_DEMO/Asset/Icon/icon-152x152.png',
    '/PWA_FI_PAGE_DEMO/Asset/Icon/icon-192x192.png',
    '/PWA_FI_PAGE_DEMO/Asset/Icon/icon-384x384.png',
    '/PWA_FI_PAGE_DEMO/Asset/Icon/icon-512x512.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});