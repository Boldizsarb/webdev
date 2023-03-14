
import express from 'express';
import Database from "better-sqlite3"; // had to import this one too to work 
const songsRouter = express.Router(); // creating a router object

const app = express();

import 'dotenv/config';             // dotenv
const { DB_DATABASE}  = process.env

//const db = new Database("C:\\Users\\donbo\\Documents\\Coding\\WebDev\\webdev\\Middlaware_ and_dotenv\\hittastic\\wadsongs.db")
const db = new Database(DB_DATABASE)

/////////////////////////////////////////////////////////GET//////////////////GET////////////////////////

songsRouter.get("/all", (req, res) => {
    const stmt = db.prepare("SELECT * FROM wadsongs ");
    const songs = stmt.all();
    res.json(songs);
    }
);

songsRouter.get("/artist/:artistp", (req, res) => {
    const stmt = db.prepare("SELECT * FROM wadsongs where artist = ?");
    const songs = stmt.all(req.params.artistp);
    res.json(songs);
    }   
);

songsRouter.get("/title/:titlep", (req, res) => {
    const stmt = db.prepare("SELECT * FROM wadsongs where title = ?");
    const songs = stmt.all(req.params.titlep);
    res.json(songs);
    }   
);

songsRouter.get("/artist/:artistp/title/:titlep", (req, res) => {
    const stmt = db.prepare("SELECT * FROM wadsongs where title = ? and artist = ?");
    const songs = stmt.all(req.params.artistp, req.params.titlep);
    res.json(songs);
    }   
);

songsRouter.get("/id/:idp", (req, res) => {
    const stmt = db.prepare("SELECT * FROM wadsongs where id = ?");
    const songs = stmt.all(req.params.idp);
    res.json(songs);
    }   
);


//app.use(express.static("public"));
//app.use("/public", express.static('./public/'));
app.use(express.json());

songsRouter.get("/song", (req, res) => {
    res.render('addSong', { errors: {} })    
  });

app.use(express.urlencoded({extended: false}));


/////////////////////////////////////////////////////////POST//////////////////POST////////////////////////

songsRouter.post("/buy/:idp", (req, res) => {
    const stmt = db.prepare("UPDATE wadsongs SET quantity = quantity - 1 WHERE id = ?");
    stmt.run(req.params.idp);
    //const songs = stmt.all(req.params.idp);
    res.json("bought");
   //res.json(songs)
   console.log("bought");
});


// adding a song 
songsRouter.post("/song/create", (req, res) => {   // error handling 
    const { title, artist, year, downloads, price, quantity } = req.body;
  
    if (!title || !artist || !year || !downloads || !price || !quantity) {
      return res.status(400).send("Bad Request: All fields are required");
    }
  
    // Add the song to the database or store it in memory
  
    res.send("Song added successfully");
});

/////////////////////////////// DELETE /////////////////////////////////

// delete a song
songsRouter.delete("/delete/:idp", (req, res) => {
    const stmt = db.prepare("DELETE FROM wadsongs WHERE id = ?");
    stmt.run(req.params.idp);
    //const songs = stmt.all(req.params.idp);
    res.json("deleted");
});

export default songsRouter // export the module for external use