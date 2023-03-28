//import { json, response } from "express";  // not needed 
console.log('Hello World');

// function for fetching the parameter
function artistSearch(artist){
    fetch(`http://localhost:3000/songs/artist/${artist}`)
    .then(response => response.json())
    .then(songs => {
        let para = "";
        let input = "";
        console.log(`here is the data ${songs}`);
        songs.forEach(song => {
            para = document.createElement("p");
            para.innerHTML = "Title:" +song.title +" Artist:" +song.artist+ " Year: "+ song.year+ " Downloads: "+song.downloads+ " Price: "+song.price+" Quantity: "+song.quantity;
             
            input = document.createElement("input");
            input.setAttribute("value", "buy");
            input.setAttribute("type", "button");

            input.addEventListener ("click", () =>   // adding eventlistener to the buy button 
                {
                    // calling the buy API route on onclick 
                    fetch(`http://localhost:3000/songs/buy/${song.id}`,{
                        method: 'POST',   // this is needed otherwise the browser would do the default get method 
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Successfully bought song:", song.title);
                        // if the quantity is 0, then the button is disabled
                        if(song.quantity == 0){
                            input.disabled = true;
                        }
                    });
                }
            );

        });
        
        // document fragment to show all the appendChild
        let documentFragment = document.createDocumentFragment();
        documentFragment.appendChild(para);
        documentFragment.appendChild(input);
        document.getElementById("resultsList").appendChild(documentFragment);

        //document.getElementById("resultsList").appendChild(input, para);
    });
}
// event listener
document.getElementById("search").addEventListener('click', ()=>{
    let artist = document.getElementById("artist").value;
    artistSearch(artist);
})
///////////////////////////// where are the artists////////////////////////////////////////////////////////////

function artistSearchHome(artist){
    fetch(`http://localhost:3000/artists/homeArtist/${artist}`)  // the root 
    .then(response => response.json())
    .then(songs => {
        let para = "";
        let input = "";
        songs.forEach(song => {
            para = document.createElement("p");
            para.innerHTML = "Artist:" +song.name +" Lattitude:" +song.lat+ " Longttitude: "+ song.lon+ " Hometown: "+song.hometown;
            /////// changing variables
            lattitude = song.lat   // changing to that specific artist 
            longtitude = song.lon
            markerLet = [lattitude, longtitude]  // had to be included othervise it wouldnt work 
            //////////////////////// setting up the map 
            map.setView([lattitude, longtitude], 14); // setting the map to show the origin of that artist
            let marker = L.marker(markerLet).addTo(map);
            marker.bindPopup(`${song.name} Lives here!`)  // clicking on the marker this massage pops up 

            
        });
        // document fragment to show all the appendChild
        let documentFragment = document.createDocumentFragment();
        documentFragment.appendChild(para);
        //documentFragment.appendChild(input);  // there is no input yet 
        document.getElementById("resultsList").appendChild(documentFragment);

        //document.getElementById("resultsList").appendChild(input, para);
    });
}

document.getElementById("searchome").addEventListener('click', ()=>{
    let artist = document.getElementById("artistHome").value;
    artistSearchHome(artist);
})
///////////////// map /////////////////////////////////////////////////////////////////map////////////
const map = L.map ("map1"); // create a map object into the div

let lattitude = 50.79239632947494  /// initializing the variables 
let longtitude = -1.0715309473127972
let markerLet = [lattitude, longtitude]

const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";   // copy right notice 

L.tileLayer  
        ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", // {z} is for zoom level, {x} {y} are indices, {x}-west east index, the {s} is the server 
            { attribution: attrib } ).addTo(map);



map.setView(markerLet,14)
L.marker(markerLet).addTo(map);

map.on("click", e=>{
    const marker = L.marker(markerLet).addTo(map);// storing the marker in a variable 
    //alert(`You clicked at:${e.latlng.lat} ${e.latlng.lng}`);
    lattitude = e.latlng.lat   // updating the variable to wherever the user clicked! 
    longtitude = e.latlng.lng
    markerLet = [lattitude, longtitude]
    const text = prompt("Please enter the Artist's name here:")
    const town = prompt("enter the town")
    //marker.bindPopup(text, town)  // two promt possible 

    if(text.length <= 2 && town.length <= 2){
        map.removeLayer(marker) // removing marker if there is not enough caracter 
    }else{
        fetch(`http://localhost:3000/artists/artistAdd/${text}/${lattitude}/${longtitude}/${town}`,{  // inserting the details to the database
            method: 'POST',   // this is needed otherwise the browser would do the default get method 
        })
        .then(response => {
            if (response.status == 401) {
                alert("Login first mate")     ////// IMPORTANT:::: the alert stuff is controlled here!!!! 
                //throw new Error(response.status);
                
            }else {
                return response.json()
                    .then(data => {
                        console.log("Successfully added artist:", text);
                        L.marker(markerLet).addTo(map);
                        marker.bindPopup(text).openPopup();
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        alert(`An error occurred while adding the artist: ${error}`);
                    });
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert(`An error occurred while adding the artist: ${error}`);
        });
    }
    });

////////// getting all the markers at once
function getAllMarkers() {

    fetch(`http://localhost:3000/artists/getAllMarkers`)
    .then(response => response.json())
    .then(markers => {
        markers.forEach(marker => {
            let markerLet = [marker.lat, marker.lon]
            L.marker(markerLet).addTo(map).bindPopup(`${marker.name} Lives here!`)
        });
    });
}
document.getElementById("buton").addEventListener('click', ()=>{
    getAllMarkers()
})
// issues: after one click on the map, the marker becomes becomes unclickable due to the click listener!! 


//////login//////////////////// login//////////////
