if (localStorage.hasOwnProperty("loggedInUser") == true) {
    window.location.href = "home.html";
}


else {
    let arrayOfUsers = JSON.parse(window.localStorage.getItem("user"));

    let newlyRegisteredUser = arrayOfUsers[0];
    console.log({ arrayOfUsers });
    arrayOfUsers.forEach((user) => {
        if (user.timestamp > newlyRegisteredUser.timestamp) {
            console.log({ user });
            console.log({ newlyRegisteredUser });
            newlyRegisteredUser = user;
        }
    });
    //accessing the table and populating 
    document.getElementById("nameCell").innerHTML = newlyRegisteredUser.fullName;
    document.getElementById("emailCell").innerHTML = newlyRegisteredUser.emailId;

}
