import express from 'express';
import Database from "better-sqlite3"; // had to import this one too to work 
const mapRouter = express.Router(); // creating a router object

import 'dotenv/config';             // dotenv
let { DB_DATABASE,APP_USER}  = process.env

const db = new Database(DB_DATABASE)
const table = "artists"

class mapDAO{

    constructor(db,table){
        this.db = db
        this.table = table
    }

    getAllMarkers(){
        const stmt = this.db.prepare(`SELECT * FROM ${this.table} `);
        const songs = stmt.all();
        return songs
    }

    getArtist(artistp){
        const stmt = this.db.prepare(`SELECT * FROM ${this.table} where name = ?`);
        const songs = stmt.all(artistp);
        if(songs.length == 0){
            return null;
        }else{
            return songs
            // or return result[0] 
        }
        
    }

    addArtist(name, lat, lon, hometown) {
        const stmt = this.db.prepare(`INSERT INTO ${this.table} (name, lat, lon, hometown) VALUES (?,?,?,?)`);
        stmt.run(name, lat, lon, hometown)
    }
    
}

export default mapDAO