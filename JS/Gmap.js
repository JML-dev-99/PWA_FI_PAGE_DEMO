
let map;
let infoWindow;
let marker;


//call importLibrary() inside async function
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    //API key cannot use AdvancedMarkerElement
     const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map (document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });

    infoWindow = new google.maps.InfoWindow(), 


     marker = new google.maps.Marker({
         position: { lat: -34.397, lng: 150.644 },
         map: map,
        title: "default location"
     });

}

initMap();



const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

//user info console
function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
}

//user denied access location
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

//ask user permission
navigator.geolocation.getCurrentPosition(success, error, options)
{

    //located user currentlocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };


                //After located show marker and located.
                marker.setPosition(pos);
                map.setCenter(pos);
                //infoWindow.setPosition(pos);
                //infoWindow.setContent("location found");
                //infoWindow.open(map);
                map.setZoom(15);
        
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            },
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}