console.log("running");
//////////////// login button 
document.getElementById("loginBut").addEventListener("click", async()=> {
        // Create an object containing the details from the form
        const loginDetails = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }
        // Send the object to the server

    // login ajax request 
    try{
        const response = await fetch("/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginDetails)
        });
        const data = await response.json();
        if(response.status == 200) {
            alert("Successfully Logged in");
        } else if (response.status == 401) {
            alert("Blank fields");
        } else {
            alert(`Unknown error: code ${response.status}`);
        }

    }catch(e){
        alert(`Error: ${e}`);
    }
})
/////////// Logout button 

document.getElementById("logoutBut").addEventListener("click", async()=> {
    try{
        const response = await fetch("/users/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if(response.status == 200) {
            alert("Successfully Logged out");
            // or do soemthing in this case, appear or disappear something 
        } else if (response.status == 401) {
            alert("Blank fields");
        } else {
            alert(`Unknown error: code ${response.status}`);
        }

    }catch(e){
        alert(`Error: ${e}`);
    }
});

// this needs to be react! 

/*
import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const loginDetails = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      const data = await response.json();
      if (response.status === 200) {
        alert("Successfully Logged in");
      } else if (response.status === 401) {
        alert("Blank fields");
      } else {
        alert(`Unknown error: code ${response.status}`);
      }
    } catch (e) {
      alert(`Error: ${e}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;

// needs to be in html though 
*/