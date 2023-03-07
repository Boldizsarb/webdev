console.log('Hello World');

// function for fetching the parameter
function artistSearch(artist){
    fetch(`http://localhost:3000/artist/${artist}`)
    .then(response => response.json())
    .then(songs => {
        let html = "";
        songs.forEach(song => {
            html += `
            <div class="card">
            <div class="card-body">
            <h5 class="card-title">Title: ${song.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Artist: ${song.artist}</h6>
            <p class="card-text"> Year: ${song.year}</p>
            <p class="card-text">Downloads: ${song.downloads}</p>
            <p class="card-text">Price: ${song.price}</p>
            <p class="card-text">Quantity: ${song.quantity}</p>
            </div>
            </div>
            `;
        }
        );
        document.getElementById("resultsList").innerHTML = html;
    });
}
// event listener
document.getElementById("search").addEventListener('click', ()=>{
    let artist = document.getElementById("artist").value;
    artistSearch(artist);
})