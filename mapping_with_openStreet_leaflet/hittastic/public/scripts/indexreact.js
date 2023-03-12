
/*
//////////////////// Simple/////////
function InputWidget({title, defaultArtist}){

    const [artist, setArtist] = React.useState(artist)

    return(
        <div>
            <h3> Input the Artist:</h3>
            <input type="text" id="artist" placeholder="Input the name of the Artist here" value={artist} onChange={updateState} />
            <button id="searchButton" value= "Search" onClick={alertA}>Search</button>
        </div>
    );  

    function updateState()
    {
        setArtist(document.getElementById("artist").value);
    }

    function alertA()
    {
        alert(`You entered: ${artist}`);
    }
}
const root = ReactDOM.createRoot(
    document.getElementById('root')
);
root.render(
    <InputWidget defaultArtist="Artist" />
);
*/
////////////////////////////// state variables /////////////// with an array list

/*
let artistId = 1;

function CartWidget({list}){
    const [artist, setArtist] = React.useState([]);

    const listHtml = artist.map ( item => <li key={item.id}>{item.name}</li>);

    return(
        <div>
            <h1>{list}</h1>
            <h3> Input the Artist:</h3>
            <input type="text" id="item" placeholder="Input the name of the Artist here"   />
            <button id="searchButton" value= "Search" onClick={addItem}>Search</button>
            <div>
                <h3>The song</h3>
                <ul>
                    {listHtml}
                </ul>
            </div>
        </div>
        
    );  

    function addItem()
    {
        const songs = structuredClone(artist);
        const newArtist = {
            id: artistId++,
            name: document.getElementById("item").value
        };
        songs.push(newArtist);
        setArtist(songs);
        
    }

    
}
const root2 = ReactDOM.createRoot(
    document.getElementById('root2')
);

root2.render(
    <CartWidget list="Songs List" />
);

*/

//let artistId = 1;

function CartWidget({list}){
    const [artist, setArtist] = React.useState("");
    const [songs, setSongs] = React.useState([]);

    function searchByArtist() {
        const artistName = document.getElementById("item").value;
    
        fetch(`http://localhost:3000/artist/${artistName}`, { // checking the existent of the input in the database 
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => setSongs(data));
      }


    return(  // returning the results! 
        <div>
            <h1>{list}</h1>
            <h3> Input the Artist:</h3>
            <input type="text" id="item" placeholder="Input the name of the Artist here"  />
            <button id="searchButton" value="Search" onClick={searchByArtist}>Search</button>
            <div>
                <h3>Songs:</h3>
                {songs.length > 0 ? (    // if the length of the songs array is greater than 0, then it will display the songs
                songs.map((song) => (
                    <div key={song.id}>
                    <p>Title: {song.title}</p>
                    <p>Artist: {song.artist}</p>
                    <p>Year: {song.year}</p>
                    <p>Quantity: {song.quantity}</p>
                    </div>
                ))
                ) : (
                <p>No results found.</p>
            )}
        </div>
        
        </div>
    );  

    /*
    function addItem() {
        const newArtist = document.getElementById("item").value;
        setArtist(newArtist);
    }
    */
}

const root2 = ReactDOM.createRoot(
    document.getElementById('root2')
);

root2.render(
    <CartWidget list="Songs List" />
);
