The exercise will allow you to practise with routers, middleware and `dotenv`.

**IMPORTANT:** This is a slightly more advanced topic, so you need to ensure you fully understand the material from Weeks 1-4 and 6 before attempting it. Please ensure that you have completed last week (Week 6) first, and also the standard exercises for Weeks 1-4.

1. Make a ***copy*** of your Express server, so you still have the original version for reference.
2. Available [here](https://nwcourses.github.io/COM518/wadsongs.db) is an updated wadsongs.db to use, including an `ht_users` table for users. Note the `ht_users` table has these columns: username, password, name, dayofbirth, monthofbirth, yearofbirth, balance, isadmin, id. Download this, so it replaces your existing wadsongs.db.
3. Create a separate ***router*** file, containing routes for users. This should be named `users.mjs`, should create an `express.Router()` as shown in the second example, and should contain two routes relating to users. These should be:
    - An `/allUsers` route which returns details of all users as JSON;
    - a `/user/:username` route which returns details of a specific user, identified by username.
4. Include the router you have just created in your main Express app under the top-level route `/users`, as shown in the example.
5. Test it out by trying out the following in your browser (type in the URL directly, do not access from AJAX):
    - List all users;
    - Look up a user by username.
6. Now, similarly, move all your routes to handle songs (i.e. everything you did in week 2) to a separate router inside the file `songs.mjs`. In the same way that you did for your `users` router, include this router under the top-level route `/songs`, and test it by searching for all songs by a particular artist by requesting the correct URL in your browser.
7. Install `dotenv` and `import` it in your main server application. Add ***middleware*** to your server so that any `POST` request can only be accessed if the environment variable `process.env.APP_USER` exists. (This is a way of simulating a user being logged in without writing a full login system, which we have not done yet). To test whether `process.env.username` exists we can test whether it's `undefined`:Test this out by first trying to access a `POST` route without creating a `.env` file. Test this out in RESTer; you should get a 401 error and the "Go away" message as a response. Then, create a `.env` file with a `username` environment variable. The username can be anything, for example:You should now be able to access your POST route.
    
    
8. As shown in the example with CORS, write the user-checking middleware in a separate module as a function and export it. Then, `import` it and `use()` it in the main server file by specifying the name of the function exported from the module.

Prevent all access to the `/users` group of routes (see Question 3) unless the username exists in `.env`. Use the same middleware for this.

1. **Advanced question:** Modify your answer to the previous question so that, if the `/users` group of routes is requested, the middleware checks that the `APP_USER` username is ***actually in the database*** (use a SELECT statement to do this) and that the value of the `isadmin` column of this user is 1. In this way, only admin users can access the `/users` routes which, for data protection reasons, is probably a good idea!