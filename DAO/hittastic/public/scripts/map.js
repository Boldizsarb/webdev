const map = L.map ("map1"); // create a map object into the div

const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";   // copy right notice 

L.tileLayer  
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", // {z} is for zoom level, {x} {y} are indices, {x}-west east index, the {s} is the server 
            { attribution: attrib } ).addTo(map);

//map.setView([50.908,-1.4], 14); // two arguments:[array of lattitude and longtitude], and the zoom level

const pos = [50.79239632947494, -1.0715309473127972]
map.setView(pos,14)
map.on("click", e=>{
    const marker = L.marker(pos).addTo(map);// storing the marker in a variable 
    const text = prompt("Enter your location")
    marker.bindPopup(text)

})
 // we add a popupp with that marker 