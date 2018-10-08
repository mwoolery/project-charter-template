
// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.watchPosition(showPosition);
//     } else { 
//        alert("Geolocation is not supported by this browser.");
//     }

// }
// function showPosition(position) {
//  const Latitude= position.coords.latitude ;
//    const Longitide= position.coords.longitude;
// }
// //pin location in google maps

var Lat= "";var Lon="";
var x=document.getElementById("iframeid").src;
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
       alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    Lat= position.coords.latitude ; 
    Lon= position.coords.longitude; 
    x="https://www.google.com/maps/dir/"+Lat+","+Lon+"/Hughes+Fieldhouse,+Maryville,+MO/@40.3539439,-94.8874161,17z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x87eac5ba7ad20f5b:0x42cf1256aa018161!2m2!1d-94.8890537!2d40.3517934"

}

