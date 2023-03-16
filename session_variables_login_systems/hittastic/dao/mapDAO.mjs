import express from 'express';
import Database from "better-sqlite3"; // had to import this one too to work 
const mapRouter = express.Router(); // creating a router object

import 'dotenv/config';             // dotenv
let { DB_DATABASE,APP_USER}  = process.env

const db = new Database(DB_DATABASE)

class mapDAO{
    constructor(db){
        this.db = db
        table = "artists"
    }

    getAllMarkers(){
        const stmt = this.db.prepare("SELECT * FROM artists ");
        const songs = stmt.all();
        return songs
    }

    getArtist(artistp){
        const stmt = this.db.prepare("SELECT * FROM artists where name = ?");
        const songs = stmt.all(artistp);
        return songs
    }

    postLocation(name,lat,lon,hometown)






    /*
    mapRouter.post("/artistAdd/:name/:lat/:lon/:hometown", (req, res) => {
        const stmt = db.prepare("INSERT INTO artists (name, lat, lon, hometown) VALUES (?,?,?,?)");
        stmt.run(req.params.name, req.params.lat, req.params.lon, req.params.hometown);
        //const songs = stmt.all(req.params.idp);
        //res.json("added");
    });
    */

}

export default mapDAO