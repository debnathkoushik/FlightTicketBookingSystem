if (localStorage.hasOwnProperty("loggedInUser") == true) {
    //accessing the log out element and adding "click" event listener
    document.getElementById("logOut").addEventListener("click", () => {

        //logging out the "logged in user"
        window.localStorage.removeItem("loggedInUser");

        //console.log(JSON.parse(window.localStorage.getItem("loggedInUser")));

        //redirect to log in page
        window.location.href = "login.html";
    });
}

else {
    window.location.href = "login.html";
}





