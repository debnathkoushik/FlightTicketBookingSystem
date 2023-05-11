if (localStorage.hasOwnProperty("loggedInUser") == true) {
    window.location.href = "home.html";
} else {
    //checking for "array of users" in the localStorage
    //if exists fetch the "array of users"
    //else create a new one
    if (localStorage.hasOwnProperty("user") == false) {
        //predefined user
        let arrayOfUsers = [{
            fullName: "Koushik",
            emailId: "debnathkoushik605@gmail.com",
            phoneNumber: 9366122876,
            password: "Koushik@123",
            tickets: [{
                pnr: "012345678QR",
                travelDate: "2023-04-27",
                sourceCity: "Pune",
                destinationCity: "Kolkata",
                ticketStatus: "open",
                seatPreference: "window",
                foodPreference: "non-veg",
                timestamp: 1583295797015
            }],
            timestamp: 1583295797015
        },
        {
            fullName: "Chinmoy",
            emailId: "debnathchinmoy606@gmail.com",
            phoneNumber: 9366122877,
            password: "Chinmoy@123",
            tickets: [{
                pnr: "012345678QR",
                travelDate: "2023-04-27",
                sourceCity: "Pune",
                destinationCity: "Kolkata",
                ticketStatus: "open",
                seatPreference: "window",
                foodPreference: "non-veg",
                timestamp: 1583295797016
            }],
            timestamp: 1583295797016
        }
        ]

        //pushing the predefined user in "arrayOfUsers" to "localStorage"
        window.localStorage.setItem("user", JSON.stringify(arrayOfUsers));
    }


    //fetching the user array from localStorage
    let arrayOfUsers = JSON.parse(window.localStorage.getItem("user"));
    //console.log(arrayOfUsers);


    //temporary object for storing the details of the user
    let loggedInUser = new Object;

    //validates the log in credentials
    function loginValidationChecker() {
        //console.log(JSON.parse(window.localStorage.getItem("user")));
        //fetching entered email Id element and password element from login page
        let enteredEmailId = document.getElementById("userEmailId");
        let enteredPassword = document.getElementById("userPassword");

        //checking for null email Id and password
        if (enteredEmailId.value == "" && enteredPassword.value == "") {
            alert("Please enter registered email Id and password!");
        } else {
            let position = 0;

            //checks if email Id entered by the user exists in the localStorage and the password entered is correct
            for (; position < arrayOfUsers.length; position++) {
                if (enteredEmailId.value == arrayOfUsers[position].emailId) {
                    if (enteredPassword.value == arrayOfUsers[position].password) {
                        loggedInUser = arrayOfUsers[position];

                        //storing the credentials of the logged in user
                        window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

                        //redirect to homepage
                        window.location.href = "home.html";
                        break;
                    }

                    alert("Invalid user credentials!");
                    break;
                }
            }

            if (position == arrayOfUsers.length) {
                alert("Invalid user credentials!");
            }


        }
    }

    document.getElementById("click").addEventListener("click", loginValidationChecker);

}
