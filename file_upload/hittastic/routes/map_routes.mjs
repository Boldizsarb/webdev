
import express from 'express';
import Database from "better-sqlite3"; // had to import this one too to work 
const mapRouter = express.Router(); // creating a router object
import 'dotenv/config';             // dotenv
let { DB_DATABASE,APP_USER}  = process.env
const db = new Database(DB_DATABASE)

import mapController from '../controllers/mapControl.mjs';
const mapControl = new mapController(db);

mapRouter.get("/getAllMarkers", mapControl.getAllMarkers.bind(mapControl));
mapRouter.get("/homeArtist/:artistp", mapControl.getArtist.bind(mapControl));
mapRouter.post( '/artistAdd/:name/:lat/:lon/:hometown', mapControl.addArtist.bind(mapControl));



mapRouter.post( '*', (req,res,next) => {      // if there is no user it wont do shit ;)                   
    //if(APP_USER === undefined || APP_USER === "") {
        if(req.session.username == null) {
            console.log(req.session.username)
        // process.env.APP_USER does not exist (it's undefined)
        // Return a 401 (Unauthorized) HTTP code, with a JSON error message
        res.status(401).json({error: "You're not logged in. Go away!"})
        console.log("no user")
        
    } else {
        console.log(`Received a POST request at ${Date.now()} milliseconds. By ${req.session.username}`);
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



/*
mapRouter.get("/getAllMarkers", (req,res)=>{
    const stmt = db.prepare("SELECT * FROM artists ");
    const songs = stmt.all();
    res.json(songs);
})

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
*/

/////// simple map GET///////
mapRouter.get("/map", (req, res) => {
    res.render('map', { errors: {} })    
});










export default mapRouter // export the module for external use