
import express from 'express';
import Database from "better-sqlite3"; // had to import this one too to work 
const mapRouter = express.Router(); // creating a router object

import 'dotenv/config';             // dotenv
let { DB_DATABASE,APP_USER}  = process.env

//const db = new Database("C:\\Users\\donbo\\Documents\\Coding\\WebDev\\webdev\\Middlaware_ and_dotenv\\hittastic\\wadsongs.db")
const db = new Database(DB_DATABASE)

APP_USER = "adam"  // assigning the dotenv variable's value 

 mapRouter.post( '*', (req,res,next) => {                       // this one only restricts post requests but doesnt preceive variable change! need to restart the server to work 
    if(APP_USER === undefined || APP_USER === "") {
        // process.env.APP_USER does not exist (it's undefined)
        // Return a 401 (Unauthorized) HTTP code, with a JSON error message
        res.status(401).json({error: "You're not logged in. Go away!"});
        alert("Log in first mate")
        console.log("no user")
    } else {
    console.log(`Received a POST request at ${Date.now()} milliseconds. By ${APP_USER}`);
    next();
    }
});


/*     
if(process.env.APP_USER === undefined) {                                // it stops usage alltogether
    // process.env.APP_USER does not exist (it's undefined)
    // Return a 401 (Unauthorized) HTTP code, with a JSON error message
    res.status(401).json({error: "You're not logged in. Go away!"});
} else {
    // username exists, carry on...
    mapRouter.post( '*', (req,res,next) => {
        console.log(`Received a POST request at ${Date.now()} milliseconds. By ${APP_USER}`);
        next();
    });
}
*/

mapRouter.get("/getAllMarkers", (req,res)=>{
    const stmt = db.prepare("SELECT * FROM artists ");
    const songs = stmt.all();
    res.json(songs);
})
/////// simple map GET///////
mapRouter.get("/map", (req, res) => {
    res.render('map', { errors: {} })    
});

mapRouter.get("/homeArtist/:artistp", (req, res) => {
    const stmt = db.prepare("SELECT * FROM artists where name = ?");
    const songs = stmt.all(req.params.artistp);
    res.json(songs);
    }   
);


mapRouter.post("/artistAdd/:name/:lat/:lon/:hometown", (req, res) => {
    const stmt = db.prepare("INSERT INTO artists (name, lat, lon, hometown) VALUES (?,?,?,?)");
    stmt.run(req.params.name, req.params.lat, req.params.lon, req.params.hometown);
    //const songs = stmt.all(req.params.idp);
    //res.json("added");
});





export default mapRouter // export the module for external use