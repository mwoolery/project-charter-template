
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else { 
       alert("Geolocation is not supported by this browser.");
    }
    
function showPosition(position) {
 const Latitude= position.coords.latitude ;
   const Longitide= position.coords.longitude;
}
//pin location in google maps
}