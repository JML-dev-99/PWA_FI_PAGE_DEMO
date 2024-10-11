//This statement/condition connect service-work.js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./JS/service-worker.js') 
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// Ensure the button is always visible
installBtn.style.display = 'block';

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing
    e.preventDefault();
    // Save the event for later use
    deferredPrompt = e;

    // When the button is clicked, show the install prompt
    installBtn.addEventListener('click', () => {
        // If the install prompt is available
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Show the install prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null; // Reset after the prompt is shown
            });
        } else {
            console.log('Install prompt not available');
        }
    });
});

// Optional: Listen for the appinstalled event
window.addEventListener('appinstalled', () => {
    console.log('PWA has been installed');
    installBtn.style.display = 'none'; // Hide the button after installation
});
