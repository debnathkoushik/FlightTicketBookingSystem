if (localStorage.hasOwnProperty("loggedInUser") == true) {
    //fetching logged in user details from localStorage
    let loggedInUserElement = JSON.parse(window.localStorage.getItem("loggedInUser"));

    //makes sure the user don't input any date from the past
    window.onload = () => {
        let today = new Date().toISOString().split('T')[0];
        document.getElementById("travelDate").setAttribute('min', today);
    }


    function travelDateValidator(dateOfDeparture) {
        if (dateOfDeparture != "") {
            return true;
        }

        return false;
    }


    function sourceAndDestinationValidator(sourceCity, destinationCity) {
        if (sourceCity != "" && destinationCity != "") {
            if (sourceCity != destinationCity) {
                return true;
            }

            else {
                alert("Source city and destination city cannot be same!");
                return false;
            }
        }

        else {
            alert("Source city or destination city cannot be empty!");
            return false;
        }

    }

    //validates that ticket status field is not empty before booking any ticket
    function ticketStatusValidator(ticketStatus) {
        if (ticketStatus != "") {
            return true;
        }

        else {
            return false;
        }
    }

    //validates that seat preference field is not empty before booking any ticket
    function seatPreferenceValidator(seatPreference) {
        if (seatPreference != "") {
            return true;
        }

        else {
            return false;
        }
    }


    function bookTicket() {
        //fetching inputs
        let dateOfDeparture = document.getElementById("travelDate").value;

        let sourceCity = document.getElementById("sourceCity").options[document.getElementById("sourceCity").selectedIndex].value;

        let destinationCity = document.getElementById("destinationCity").options[document.getElementById("destinationCity").selectedIndex].value;

        let ticketStatus = "";
        document.getElementsByName("ticketStatus").forEach((option) => {
            if (option.checked == true) {
                ticketStatus = option.value;
            }
        });

        let seatPreference = "";
        document.getElementsByName("seatPreference").forEach((option) => {
            if (option.checked == true) {
                seatPreference = option.value;
            }
        });

        let foodPreference = "";
        document.getElementsByName("foodPreference").forEach((option) => {
            if (option.checked == true) {
                foodPreference = option.value;
            }
        });

        //checks if mandatory input fields are not empty before booking any ticket
        if (travelDateValidator(dateOfDeparture) &&
            sourceAndDestinationValidator(sourceCity, destinationCity) &&
            ticketStatusValidator(ticketStatus) &&
            seatPreferenceValidator(seatPreference)) {

            let arrayOfUsers = JSON.parse(window.localStorage.getItem("user"));

            console.log(arrayOfUsers);

            arrayOfUsers.forEach((loggedInUser) => {
                if (loggedInUser.emailId == loggedInUserElement.emailId) {

                    let currentTicket = new Object;

                    //timestamp helps to identify which is the most recent
                    let timestamp = Date.now();

                    //generates PNR for every ticket a user books
                    let pnr = sourceCity.charAt(0) + destinationCity.charAt(0) + loggedInUserElement.phoneNumber + JSON.stringify(loggedInUser.tickets.length + 1);

                    //populating the currentTicket with the required properties
                    currentTicket.pnr = pnr;
                    currentTicket.travelDate = dateOfDeparture;
                    currentTicket.sourceCity = sourceCity;
                    currentTicket.destinationCity = destinationCity;
                    currentTicket.ticketStatus = ticketStatus;
                    currentTicket.seatPreference = seatPreference;
                    currentTicket.foodPreference = foodPreference;
                    currentTicket.timestamp = timestamp;

                    console.log({ currentTicket });

                    loggedInUser.tickets.push(currentTicket);

                    //setting the array of users back to localStorage
                    window.localStorage.setItem("user", JSON.stringify(arrayOfUsers));

                    window.location.href = "viewRecentTicket.html";
                }
            })
        }

    }

    document.getElementById("book").addEventListener("click", bookTicket);

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