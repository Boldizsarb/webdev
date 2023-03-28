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


import expressSession from 'express-session';
import betterSqlite3Session from 'express-session-better-sqlite3';

const sessDb = new Database('session.db');

// create on object for creating the session store
// SqliteStore is similar in concept to a class
const SqliteStore = betterSqlite3Session(expressSession, sessDb); ///// the session variable needs to come before the routes!!! othervise it wont work
app.use(expressSession({
  // Specify the session store to be used.
      store: new SqliteStore(),    //sql lite store 
  
  // a secret used to digitally sign session cookie, use something unguessable (e.g. random bytes as hex) in a real application.
      secret: 'BinnieAndClyde',
  
  // regenerate session on each request (keeping the session active)
      resave: true,  // keeping sessing active, usually just leace it true
  
  // save session to store before data is stored in it (disabled as this unnecessarily creates empty sessions)
      saveUninitialized: false,  // the session only saved if its not empty, if true it would be saved it even if the session is empty
   
  // reset cookie for every HTTP response. The cookie expiration time will be reset, to 'maxAge' milliseconds beyond the time of the response.
      // Thus, the session cookie will expire after 10 mins of *inactivity* (no HTTP request made and consequently no response sent) when 'rolling' is true.
      // If 'rolling' is false, the session cookie would expire after 10 minutes even if the user was interacting with the site, which would be very
      // annoying - so true is the sensible setting.
      rolling: true,  // the session will be re-initialized when the browser refreshed! otherwise the user will be locked out after 10 min even if the user interacts with the website 
  
  // destroy session (remove it from the data store) when it is set to null, deleted etc
      unset: 'destroy',
  
  // useful if using a proxy to access your server, as you will probably be doing in a production environment: this allows the session cookie to pass through the proxy
      proxy: true,
  
  // properties of session cookie
      cookie: {
          maxAge: 600000,// 600000 ms = 10 mins expiry time
          httpOnly: false// allow client-side code to access the cookie, otherwise it's kept to the HTTP messages
      }
}));



/////////////////////// express routes: 
import userRouter from './routes/user.mjs'

app.use('/users',userRouter)

// example: http://localhost:3000/users/allUsers     or http://localhost:3000/users/allUsers/TimBlack


///////////////////// SONGS///////////////////////SONGS///////////////
import songsRouter from './routes/song_routes.mjs'
app.use('/songs',songsRouter)

// example: http://localhost:3000/songs/all 

///////////////////// ARTISTS///////////////////////ARTISTS///////////////
import mapRouter from './routes/map_routes.mjs'
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

app.use( (req, res, next) => {     /// dont think it is working 
    if(["POST", "DELETE"].indexOf(req.method) == -1) {
        next(); // if the method post or delete, it checks if the user logged in
    } else {
        if(req.session.username) {
            next();
        } else {
            res.status(401).json({error: "You're not logged in. Go away!"});
        }
    }
});

app.get('/login', (req, res) => { // return json with the current username 
    // it is used to query whether the user is logged in or not 
        res.json({username: req.session.username || null} ); 
    });


app.listen(PORT, () => {
    console.log(
      `Example app listening at http://localhost:${PORT}`,
      chalk.green("✓")
    );
  });
