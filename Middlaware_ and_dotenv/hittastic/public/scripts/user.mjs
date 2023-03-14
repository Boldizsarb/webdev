////////////// week 8 

import express from 'express';
import Database from "better-sqlite3"; // had to import this one too to work 
const userRouter = express.Router(); // creating a router object

const app = express();


import 'dotenv/config';             // dotenv
const { DB_DATABASE}  = process.env

//const db = new Database("C:\\Users\\donbo\\Documents\\Coding\\WebDev\\webdev\\Middlaware_ and_dotenv\\hittastic\\wadsongs.db")
const db = new Database(DB_DATABASE)

/// all user

userRouter.get("/allUsers", (req, res) => {
    const stmt = db.prepare("SELECT * FROM ht_users ");
    const users = stmt.all();
    res.json(users);
    }
);


userRouter.get("/allUsers/:username", (req, res) => {
    const stmt = db.prepare("SELECT * FROM ht_users where username = ? ");
    const users = stmt.all(req.params.username);
    res.json(users);
    }
);

userRouter.get("/allUsers", (req, res) => {
    const stmt = db.prepare("SELECT * FROM ht_users ");
    const users = stmt.all();
    res.json(users);
    }
);


app.use(express.json());

userRouter.get("/song", (req, res) => {
    res.render('addSong', { errors: {} })    
  });

app.use(express.urlencoded({extended: false}));




export default userRouter // export the module for external use