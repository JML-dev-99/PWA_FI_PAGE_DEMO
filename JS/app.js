//This statement/condition connect service-work.js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./JS/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);

                // Check for updates
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;

                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                // New version available
                                alert('A new version of the app is available. Refresh the page to update.');
                            }
                        }
                    };
                };
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

//install button here
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default mini-info bar from appearing
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;

    // Show the install button
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'block'; // Show the button

    installButton.addEventListener('click', () => {
        // Hide the install button
        installButton.style.display = 'none';
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null; // Clear the deferred prompt
        });
    });
});

// Optional: hide the install button after the PWA has been installed
window.addEventListener('appinstalled', () => {
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'none'; // Hide the button after installation
});

// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});
