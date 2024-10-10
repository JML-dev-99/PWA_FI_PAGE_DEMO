self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-pwa-cache').then((cache) => {
            return cache.addAll([
                '/PWA_FI_PAGE_DEMO/index.html',  // Start from root
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



let deferredPrompt;  // Holds the event until the user interacts with the prompt

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();  // Prevent the browser's default install prompt
    deferredPrompt = event;  // Store the event to trigger later

    // Show the install button
    const installBtn = document.getElementById('install-btn');
    installBtn.style.display = 'block';  // Make the button visible

    // Listen for the button click
    installBtn.addEventListener('click', () => {
        // Show the prompt when the user clicks the button
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;  // Reset the prompt after it's used
        });
    });
});

// Handle the event when the PWA has been installed
window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed successfully');
    // You can hide the button or give some feedback that the PWA is installed
    document.getElementById('install-btn').style.display = 'none';
});