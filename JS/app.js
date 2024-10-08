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

    new google.maps.Marker({
        position: location,
        map: map,
    });
}

// Function to get user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to handle successful location retrieval
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    initMap(latitude, longitude); // Initialize the map with the location
    fetchWeather(latitude, longitude); // Fetch weather data
}

// Function to handle errors
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

// Function to fetch weather data using the coordinates (as shown previously)
function fetchWeather(lat, lon) {
    // Your existing fetchWeather code here
}

// Display weather data (as shown previously)
function displayWeather(data) {
    // Your existing displayWeather code here
}

// Set up event listener for the button
document.getElementById('getLocationButton').addEventListener('click', getLocation);
