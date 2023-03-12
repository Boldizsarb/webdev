**IMPORTANT! Please add your mapping code (HTML, JavaScript) to the `public` folder of your existing Express application and access it via Express**, e.g.:

```
http://localhost:3000/mapapp.html
```

This is because JavaScript modules can only be accessed if a server is running.

- Exercise 1
    1. New York is at longitude 74 West, latitude 40.75 North (more or less). Change the example above so that it's centred on New York, at zoom level 13.
    2. Find the latitude and longitude of your home town (e.g. google it) and change the example so it's centred on your home town.
- Exercise 2
    1. Add a marker on your map from Exercise 1 on your home town.
    2. Combine the marker and mouse click event examples, above, so that by clicking on the map, you add a marker to the map at that position.
    3. Using a prompt box to read the text in, bind a popup to the marker containing text entered by the user. Use a prompt box to read information in from the user, e.g:
        
        ```
        const text = prompt('Please enter some text');
        ```
        
- Exercise 3 - Connecting to a web API and displaying markers
    
    **Important:** If you are using `mysqlview`, please update it to the latest version before doing this exercise. The latest version fixes one or two bugs. On the command prompt, go to the folder containing it, and enter:
    
    ```
    git pull
    ```
    
    This [updated HitTastic! database](https://nwcourses.github.io/COM518/wadsongs.db) contains a table called `artists` which stores the latitude and longitude of the home towns of selected artists, in addition to the `wadsongs`. Download this, and replace your existing `wadsongs.db` with it.
    
    - Extend your Express server to add an additional route `/hometown/:artist` which looks up the hometown of a particular artist. It should return a JSON object containing the hometown name, latitude and longitude, or a 404 if the requested artist cannot be found in the `artists` table.
    - Modify your HitTastic! AJAX page (Sessions 3 and 4) so that as well as a "Search" button, there is a "Where is this artist from?" button. This should connect to a ***new JavaScript function*** which sends an AJAX request to this route. Also modify your code from your AJAX exercise so that it initialises a Leaflet map.
    - In the AJAX callback, parse the JSON returned so that a marker is shown on the map for that artist, and the map is centred at the artist's hometown. When the marker is clicked, the name of the home town of the artist should be shown in a popup.
    

### Exercise 4 - adding data to a web API via a map interface

- Add a ***new*** route to your server, to ***add*** a new home town to the database. The route should take, as POST data, the latitude, longitude, artist name, and home town name.
- In your client-side code, when the user clicks on the map, send a POST request to this route, containing the required information. Use the map click position for the latitude and longitude, and read the artist name and location via prompt boxes, e.g:
    
    ```
    const artist = prompt('Please enter an artist name');
    ```
    
- Add a marker to your map **when the response is received from the server, and only if a 200 is returned**.