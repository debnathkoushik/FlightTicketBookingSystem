if (localStorage.hasOwnProperty("loggedInUser") == true) {
    //fetching logged in user details from localStorage
    let loggedInUserElement = JSON.parse(window.localStorage.getItem("loggedInUser"));

    let arrayOfUsers = JSON.parse(window.localStorage.getItem("user"));
    arrayOfUsers.forEach((loggedInUser) => {
        if (loggedInUser.emailId == loggedInUserElement.emailId) {

            console.log("loggedInUser", loggedInUser);

            let recentTicket = loggedInUser.tickets[0];
            loggedInUser.tickets.forEach((ticket) => {
                if (ticket.timestamp > recentTicket.timestamp) {
                    recentTicket = ticket;
                    console.log("ticket", ticket);
                    console.log("recentTicket", recentTicket);
                }
            })
            console.log({ arrayOfUsers });

            document.getElementById("pnrcell").innerText = recentTicket.pnr;
            document.getElementById("travelDateCell").innerText = recentTicket.travelDate;
            document.getElementById("sourceCityCell").innerText = recentTicket.sourceCity;
            document.getElementById("destinationCityCell").innerText = recentTicket.destinationCity;
            document.getElementById("seatPreferenceCell").innerText = recentTicket.seatPreference;
            document.getElementById("ticketStatusCell").innerText = recentTicket.ticketStatus;
            document.getElementById("foodPreferenceCell").innerText = recentTicket.foodPreference;
        }
    })

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

