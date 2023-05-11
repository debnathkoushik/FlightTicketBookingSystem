if (localStorage.hasOwnProperty("loggedInUser") == true) {
    window.location.href = "home.html";
}

else {
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
            }
            ],
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
            }
            ],
            timestamp: 1583295797016
        }
        ]

        //pushing the predefined user in "arrayOfUsers" to "localStorage"
        window.localStorage.setItem("user", JSON.stringify(arrayOfUsers));
    }


    //fetching the array of users from the localStorage
    let arrayOfUsers = JSON.parse(window.localStorage.getItem("user"));


    //validates the user credentials before registering details of a new user in localStorage
    function registrationValidator() {
        let enteredEmailId = emailIdValidator();
        let enteredPhoneNumber = phoneNumberValidator();
        let enteredPassword = passwordValidator();

        if (enteredPhoneNumber && enteredEmailId && enteredPassword) {
            //fetch full name and gender of the user
            let fullName = document.getElementById("fullName").value;

            let gender = "";
            document.getElementsByName("gender").forEach((element) => {
                if (element.checked == true) {
                    gender = element.value;
                }
            })

            //timestamp helps to identify which is the most recent
            let timestamp = Date.now();

            //pushing the user credentials into a new 'Object'
            let newUser = {
                fullName: fullName,
                gender: gender,
                emailId: enteredEmailId,
                phoneNumber: enteredPhoneNumber,
                password: enteredPassword,
                tickets: [],
                timestamp: timestamp
            }
            arrayOfUsers.push(newUser);

            window.localStorage.setItem("user", JSON.stringify(arrayOfUsers));

            //redirect to registration successful page
            window.location.href = "registrationSuccessful.html";
        }
    }


    //validates email Id entered by the user
    function emailIdValidator() {
        let enteredEmailId = document.getElementById("email").value;

        // let rfc2822 = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|
        //   \\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|
        //   \[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:
        //   (?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

        //check for null
        if (enteredEmailId != null) {
            let position = 0;
            for (; position < arrayOfUsers.length; position++) {
                if (enteredEmailId == arrayOfUsers[position].emailId) {
                    alert("Email Id is registered!");
                    return false;
                }
            }
            return enteredEmailId;
        }
    }


    //validates phone number entered by the user
    function phoneNumberValidator() {
        let enteredPhoneNumber = document.getElementById("phoneNumber").value;

        //check for null
        if (enteredPhoneNumber != null) {
            let position = 0;
            for (; position < arrayOfUsers.length; position++) {
                if (enteredPhoneNumber == arrayOfUsers[position].phoneNumber) {
                    alert("Phone number is registered!");
                    return false;
                }
            }
            return enteredPhoneNumber;
        }
    }

    //validates the password entered by the user during registration
    function passwordValidator() {
        let enteredPassword = document.getElementById("password").value;
        let enteredConfirmPassword = document.getElementById("confirmPassword").value;

        if (enteredPassword === enteredConfirmPassword) {
            return enteredPassword;
        }

        return false;
    }

    document.getElementById("register").addEventListener("click", registrationValidator);
}

