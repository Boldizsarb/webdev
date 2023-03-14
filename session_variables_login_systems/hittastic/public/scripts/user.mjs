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

/////////////////////// express-session://///////////////////////////SESSION/////////////////////
import expressSession from 'express-session';
import betterSqlite3Session from 'express-session-better-sqlite3';

const sessDb = new Database('session.db');

// create on object for creating the session store
// SqliteStore is similar in concept to a class
const SqliteStore = betterSqlite3Session(expressSession, sessDb);
userRouter.use(expressSession({
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


//////////////////////////LOGIN////////////////LOGIN/////////////////////////
userRouter.get("/loginGet", (req, res) => {
    res.render('login', { errors: {} })    
});

userRouter.use(express.json())

userRouter.post('/login',(req,res)=>{
    
    const {username, password} = req.body;
    const stmt = db.prepare("SELECT * FROM ht_users where username = ? and password = ?");
    const users = stmt.all(username, password);
    
   if(users.length > 0){
    console.log("login successful")
    res.json(users)
    req.session.username = username
    req.session.password = password
    console.log(req.session.username)
   // res.json({success: 1});
   }else{
    console.log("login failed")
    res.status(401).json({error: "Incorrect login!"});
   }

});

        // JohnStevenson/newyork905
        // :username/:password'


export default userRouter // export the module for external use