
document.getElementById("loginBut").addEventListener("click", async()=> {
    // Create an object containing the details from the form
    const loginDetails = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    }
    // Send the object to the server
})
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
    } else if (response.status == 400) {
        alert("Blank fields");
    } else {
        alert(`Unknown error: code ${response.status}`);
    }

}catch(e){
    alert(`Error: ${e}`);
}