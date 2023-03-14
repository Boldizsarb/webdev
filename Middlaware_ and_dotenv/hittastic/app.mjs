import express from "express";
import Database from "better-sqlite3";
import chalk from 'chalk';   // for the green tick 


import 'dotenv/config';             // dotenv
const {PORT, DB_DATABASE}  = process.env

const db = new Database(DB_DATABASE)

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/public", express.static('./public/')); // for the script folder to be recognised 




/////////////////////// express routes: 
import userRouter from './public/scripts/user.mjs'

app.use('/users',userRouter)

// example: http://localhost:3000/users/allUsers     or http://localhost:3000/users/allUsers/TimBlack


///////////////////// SONGS///////////////////////SONGS///////////////
import songsRouter from './public/scripts/song_routes.mjs'
app.use('/songs',songsRouter)

// example: http://localhost:3000/songs/all 

///////////////////// ARTISTS///////////////////////ARTISTS///////////////
import mapRouter from './public/scripts/map_routes.mjs'
app.use('/artists',mapRouter)

///////////////////////GET////////////////////////////////
// home
app.get("/", (req, res) => {
    /*    // printing all the song onto the screen with a 
    const stmt = db.prepare("SELECT * FROM wadsongs ");
    const songs = stmt.all();
    res.json(songs);
    */
    res.render('index', { errors: {} })
});

////////////////// React: ////////////
app.use(express.static('public'));

app.get("/indexreact", (req, res) => {
   
    //res.render('index2', { errors: {} })
    res.redirect( "/public/index2.html"); // only this one works 
    //res.render( "/public/index2.html");
    
    }   
);




app.listen(PORT, () => {
    console.log(
      `Example app listening at http://localhost:${PORT}`,
      chalk.green("✓")
    );
  });
