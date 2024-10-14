let map, marker, infoWindow, watchId;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 15,
    });

    infoWindow = new google.maps.InfoWindow();

    marker = new google.maps.Marker({
        position: { lat: -34.397, lng: 150.644 },
        map: map,
        title: "Your Location"
    });

    document.getElementById("locateButton").addEventListener("click", () => {
        getLocation();
    });
}

function getLocation() {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    if (navigator.geolocation) {
        // Start watching the user's location
        watchId = navigator.geolocation.watchPosition(success, error, options);
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    const position = {
        lat: crd.latitude,
        lng: crd.longitude,
    };

    // Update marker position and center map
    marker.setPosition(position);
    map.setCenter(position);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    if (err.code === err.PERMISSION_DENIED) {
        alert("Please enable GPS for accurate location tracking.");
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

initMap();
