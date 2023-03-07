import express from "express";
import Database from "better-sqlite3";

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/public", express.static('./public/')); // for the script folder to be recognised 
// not the double backslashes!! important othervise it would not work!! 
const db = new Database("C:\\Users\\donbo\\Documents\\University\\Web Tech\\week 2\\hittastic\\wadsongs.db");

///////////////////////GET////////////////////////////////
// for everything 
app.get("/", (req, res) => {
    /*    // printing all the song onto the screen with a 
    const stmt = db.prepare("SELECT * FROM wadsongs ");
    const songs = stmt.all();
    res.json(songs);
    */
    res.render('index', { errors: {} })
    
    }   
);

// for the artists:
app.get("/artist/:artistp", (req, res) => {
    const stmt = db.prepare("SELECT * FROM wadsongs where artist = ?");
    const songs = stmt.all(req.params.artistp);
    res.json(songs);
    }   
);
// Title---->
app.get("/title/:titlep", (req, res) => {
    const stmt = db.prepare("SELECT * FROM wadsongs where title = ?");
    const songs = stmt.all(req.params.titlep);
    res.json(songs);
    }   
);
// Both Title and Artist:----> 
app.get("/artist/:artistp/title/:titlep", (req, res) => {
    const stmt = db.prepare("SELECT * FROM wadsongs where title = ? and artist = ?");
    const songs = stmt.all(req.params.artistp, req.params.titlep);
    res.json(songs);
    }   
);
// song id
app.get("/id/:idp", (req, res) => {
    const stmt = db.prepare("SELECT * FROM wadsongs where id = ?");
    const songs = stmt.all(req.params.idp);
    res.json(songs);
    }   
);

///////////////////////////////// POST /////////////////////////////////

/// buy a copy 
app.post("/buy/:idp", (req, res) => {
    const stmt = db.prepare("UPDATE wadsongs SET quantity = quantity - 1 WHERE id = ?");
    stmt.run(req.params.idp);
    //const songs = stmt.all(req.params.idp);
    res.json("bought");
});

//// Adding a song 


app.get("/song", (req, res) => {
    res.render('addSong', { errors: {} })    
  });

app.use(express.urlencoded({extended: false}));

/* //previous
app.post('/song/create', (req, res) => {
    try {
        const stmt = db.prepare('INSERT INTO wadsongs (title, artist, year, downloads, price, quantity) VALUES (?,?,?,?,?,?)');

        const info = stmt.run(req.body.title, req.body.artist, req.body.year, req.body.downloads,req.body.price,req.body.quantity);
        res.json({id: info.lastInsertRowid});
    } catch(error) {
        res.status(500).json({ error: error });
        console.log(error);
    }
});
*/

app.post("/song/create", (req, res) => {   // error handling 
    const { title, artist, year, downloads, price, quantity } = req.body;
  
    if (!title || !artist || !year || !downloads || !price || !quantity) {
      return res.status(400).send("Bad Request: All fields are required");
    }
  
    // Add the song to the database or store it in memory
  
    res.send("Song added successfully");
  });
  
  

/////////////////////////////// DELETE /////////////////////////////////

// delete a song
app.delete("/delete/:idp", (req, res) => {
    const stmt = db.prepare("DELETE FROM wadsongs WHERE id = ?");
    stmt.run(req.params.idp);
    //const songs = stmt.all(req.params.idp);
    res.json("deleted");
});





app.listen(3000, () => {
    console.log("Server started on port 3000");
}
);
