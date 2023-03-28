////////////// week 8 

import express from 'express';
import Database from "better-sqlite3"; // had to import this one too to work 
const userRouter = express.Router(); // creating a router object

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


//////////////////////////LOGIN////////////////LOGIN/////////////////////////
userRouter.get("/loginGet", (req, res) => {
    res.render('login', { errors: {} })    
});

userRouter.use(express.json())

userRouter.post('/login',(req,res,)=>{
    
    const {username, password} = req.body;
    const stmt = db.prepare("SELECT * FROM ht_users where username = ? and password = ?");
    const users = stmt.all(username, password);
    
   if(users.length > 0){
    console.log("login successful")
    //res.json(users)    // do not!! 
    req.session.username = username
    console.log(username)
    req.session.password = password
    console.log(req.session.username)
    res.json({success: 1});  // with this the actual session is working 
   }else{
    console.log("login failed")
    res.status(401).json({error: "Incorrect login!"});
   }

});

userRouter.post('/logout',(req,res,)=>{
    req.session = null;
    res.json({'success': 1});
    console.log("session terminated")
});

        // JohnStevenson/newyork905
        // :username/:password'

userRouter.get("/loginSes,",(req,res)=>{     /// doesnt watn to work 
    // it is used to query whether the user is logged in or not 
    res.json({username: req.session.username || null} ); 
});


export default userRouter // export the module for external use