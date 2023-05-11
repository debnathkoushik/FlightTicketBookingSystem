if (localStorage.hasOwnProperty("loggedInUser") == true) {
    var loggedInUserElement;
    var arrayOfUsers;

    window.onload = populateTheInputFields;

    //populates the input fields with data from the ticket
    function populateTheInputFields() {
        //makes sure the loggedInUser don't input any date from the past
        let today = new Date().toISOString().split('T')[0];
        document.getElementById("travelDate").setAttribute('min', today);

        loggedInUserElement = JSON.parse(window.localStorage.getItem("loggedInUser"));

        arrayOfUsers = JSON.parse(window.localStorage.getItem("user"));

        let loggedInUser = arrayOfUsers.find((loggedInUser) => {
            if (loggedInUserElement.emailId == loggedInUser.emailId) {
                return loggedInUser;
            }
        });

        //fetching the ticket which needs to be edited
        loggedInUser.tickets.find((ticket) => {
            if (ticket.pnr == loggedInUserElement.pnrOfTheTicketToBeEdited) {
                document.getElementById("pnrNumber").value = ticket.pnr;

                document.getElementById("travelDate").value = ticket.travelDate;

                document.getElementsByName("seatPreference").forEach((option) => {
                    if (option.value == ticket.seatPreference) {
                        option.checked = true;
                        //return true;
                    }
                });

                document.getElementsByName("foodPreference").forEach((option) => {
                    if (option.value == ticket.foodPreference) {
                        option.checked = true;
                    }
                });

                //console.log("Before: ", { ticket });
            }
        });
    }

    //collects the input after the user clicks confirm button
    function collectInputs() {
        arrayOfUsers.find((loggedInUser) => {
            if (loggedInUser.emailId == loggedInUserElement.emailId) {
                loggedInUser.tickets.find((ticket) => {
                    if (ticket.pnr == loggedInUserElement.pnrOfTheTicketToBeEdited) {

                        ticket.pnr = document.getElementById("pnrNumber").value;

                        ticket.travelDate = document.getElementById("travelDate").value;

                        document.getElementsByName("seatPreference").forEach((option) => {
                            if (option.checked == true) {
                                ticket.seatPreference = option.value;
                            }
                        });

                        document.getElementsByName("foodPreference").forEach((option) => {
                            if (option.checked == true) {
                                ticket.foodPreference = option.value;
                            }
                        });

                        let timestamp = Date.now();

                        ticket.timestamp = timestamp;

                        //setting the array of users back to localStorage
                        window.localStorage.setItem("user", JSON.stringify(arrayOfUsers));

                        //console.log(JSON.parse(window.localStorage.getItem("user")));

                        //console.log("After: ", { ticket });

                        window.location.href = "viewRecentTicket.html"
                    }
                });
            }
        });
    }

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