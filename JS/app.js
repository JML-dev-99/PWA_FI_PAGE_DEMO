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

//Geolocation code below
let map;

function initMap(latitude, longitude) {
    const location = { lat: latitude, lng: longitude };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
    });

    new google.maps.marker.AdvancedMarkerElement({
        position: location,
        map: map,
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Ensure valid coordinates
    if (!isNaN(latitude) && !isNaN(longitude)) {
        initMap(latitude, longitude);
    } else {
        console.error('Invalid coordinates');
    }
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// Wait for the DOM to fully load before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getLocationButton').addEventListener('click', getLocation);
});


