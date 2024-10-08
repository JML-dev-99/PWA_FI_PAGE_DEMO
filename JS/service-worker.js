self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-pwa-cache').then((cache) => {
            return cache.addAll([
                '/PWA_FI_PAGE_DEMO/index.html',  // Start from root
                '/PWA_FI_PAGE_DEMO/Css/Mystyle.css',
                '/PWA_FI_PAGE_DEMO/JS/app.js',
                '/PWA_FI_PAGE_DEMO/Asset/Icon/icon-192x192.png',
                '/PWA_FI_PAGE_DEMO/Asset/Icon/icon-512x512.png',
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
