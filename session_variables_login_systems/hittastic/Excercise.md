### Essential questions

1. Add code to initialise `express-session` and `express-session-better-sqlite3` on your Express server, as shown above.
2. Add the three routes in the example above (`/login` GET, `/login` POST and `/logout`), as well as the session-checking middleware, to your Express server. You should make one important change: ***the `/login` POST route should check whether the username and password are contained within the `ht_users` table***, rather than just checking for a hard-coded username and password. To do this, perform your query and then check that the number of rows returned is one by checking the length of the `results` array, for example:This code will also return the username as JSON back to the client if the login was successful, which will allow the client to display a `Logged in as ...` message.
    
    ```jsx
    if(results.length == 1) {
        res.json({"username": req.body.username});
    } else {
        // ...
    }
    
    ```
    
3. Run through this process in RESTer to check that it all works:
    - Send a POST request to your `/login` route with an appropriate username and password from the `ht_users` table. **Look at the HTTP response**; you should find that a session cookie is contained within it.
    - Send a DELETE request to your route which deletes a song with a given ID. It should be successful. Look again at the HTTP response; the session cookie should still be there, and will be there until the session is destroyed.
    - Send a POST request to your `/logout` route. This should log you out; look at the HTTP response again and you should find the session ID is no longer there.
    - Send another DELETE request to your delete song route. You should now be unable to do so.
4. Now start to add login functionality to your AJAX front end. Create a `<div>` containing a login form, with username and password fields and a "Login" button. When the button is clicked, send a request to your `/login` POST route to log the user in. Check the HTTP code sent back from the server (via `response.status`). If it's 200, replace the contents of the login <div> with a message 'Logged in as ...' containing the username. Use `innerHTML` for this. Otherwise display an error via an alert box.
5. Modify the "buy" functionality (week 6) so that if a 401 is returned from the `buy` route, an error message telling the user they're not logged in should appear as an alert box. Test it by trying to buy music before the user is logged in (it should not work) and then after they've logged in (it should work).

### More advanced questions

1. Enhance your login system so that you have "Logout" functionality, and also modify your code so that if the user reloads the page, the "Logged in as ..." message remains present. To do this:
    - When a user has logged in, add a button to the "Logged in as..." message which appears in the <div>. You can do this simply by adding the button HTML to the `innerHTML` text (or, if you are feeling ambitious, use the DOM). Ensure this button has an ID, so that you can attach an event listener to it. For example:
        
        ```
        document.getElementById(...).innerHTML = `Logged in as ... <input type='button' value='Logout' id='logoutBtn' />`
        ```
        
    - On the next line of code, use `document.getElementById()` and `addEventListener()` to add a "click" event to this button so that the user is logged out by calling the `/logout` route. Once logged out, your should re-fill the login <div> with the original login form (use `innerHTML` for this, similar to the example in the previous question; note you will need to connect the 'Login' button to an event listener to handle login).
    - **If the user reloads the page, you want the "Logged in as ..." message to remain present. This question allows you to do this.** At the start of your client-side JavaScript, call the `/login` GET route of your web server to determine if the user is logged in or not. If they are, the `username` field of the JSON returned will be non-null. If the username is non-null, display the "Logged in as... " message with the Logout button, and add the event listener to the Logout button, as in the earlier question. If not, display the login form, ensuring you continue to add an event listener to the Login button.
2. Add a signup route to your server, allowing the user to sign up. Use `bcrypt` to encode the password. Then, change your login route to use `bcrypt`. Test by using RESTer, or, alternatively, add an AJAX-based signup facility to your HTML page.

### Other things to try

- Modify your `buy` route so that the balance of the currently logged-in user is reduced by 0.79 when they buy a song.