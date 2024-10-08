self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-pwa-cache').then((cache) => {
            return cache.addAll([
                './index.html',
                './Css/Mystyle.css',
                './JS/app.js',
                './Asset/Icon/icon-192x192.png',
                './Asset/Icon/icon-512x512.png',
            ]);
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
