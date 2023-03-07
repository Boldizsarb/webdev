console.log('Hello World');

// function for fetching the parameter
function artistSearch(artist){
    fetch(`http://localhost:3000/artist/${artist}`)
    .then(response => response.json())
    .then(songs => {
        let para = "";
        let input = "";
        songs.forEach(song => {
            para = document.createElement("p");
              para.innerHTML = "Title:" +song.title +" Artist:" +song.artist+ " Year: "+ song.year+ " Downloads: "+song.downloads+ " Price: "+song.price+" Quantity: "+song.quantity;
            input = document.createElement("input");
            input.setAttribute("value", "buy");
            input.setAttribute("type", "button");

            input.addEventListener ("click", () =>   // adding eventlistener to the buy button 
                {
                    // calling the buy API route on onclick 
                    fetch(`http://localhost:3000/buy/${song.id}`,{
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