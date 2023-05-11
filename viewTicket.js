if (localStorage.hasOwnProperty("loggedInUser") == true) {
    window.onload = ticketTable;

    function ticketTable() {
        //fetching logged in user details from localStorage
        let loggedInUser = JSON.parse(window.localStorage.getItem("loggedInUser"));

        let arrayOfUsers = JSON.parse(window.localStorage.getItem("user"));
        arrayOfUsers.forEach((element) => {
            if (element.emailId == loggedInUser.emailId) {
                let activeTicket = 0;

                const divForTable = document.getElementById("displayActiveTickets");

                // creates a <table> element and a <tbody> element
                const tbl = document.createElement("table");
                tbl.name = "viewTicketTable";

                // creates a <tbody> element
                const tblBody = document.createElement("tbody");

                //console.log("Length of the user array is ", element.tickets.length);

                const tableHeadingRow = document.createElement("tr");

                const pnrHeadingCell = document.createElement("td");
                const pnrHeadingCellText = document.createTextNode("PNR");
                pnrHeadingCell.appendChild(pnrHeadingCellText);
                tableHeadingRow.appendChild(pnrHeadingCell);

                const travelDateHeadingCell = document.createElement("td");
                const travelDateHeadingCellText = document.createTextNode("Travel date");
                travelDateHeadingCell.appendChild(travelDateHeadingCellText);
                tableHeadingRow.appendChild(travelDateHeadingCell);

                const sourceCityHeadingCell = document.createElement("td");
                const sourceCityHeadingCellText = document.createTextNode("Source city");
                sourceCityHeadingCell.appendChild(sourceCityHeadingCellText);
                tableHeadingRow.appendChild(sourceCityHeadingCell);

                const destinationCityHeadingCell = document.createElement("td");
                const destinationCityHeadingCellText = document.createTextNode("Destination City");
                destinationCityHeadingCell.appendChild(destinationCityHeadingCellText);
                tableHeadingRow.appendChild(destinationCityHeadingCell);

                const ticketStatusHeadingCell = document.createElement("td");
                const ticketStatusHeadingCellText = document.createTextNode("Ticket status");
                ticketStatusHeadingCell.appendChild(ticketStatusHeadingCellText);
                tableHeadingRow.appendChild(ticketStatusHeadingCell);

                const seatPreferenceHeadingCell = document.createElement("td");
                const seatPreferenceHeadingCellText = document.createTextNode("Seat preference");
                seatPreferenceHeadingCell.appendChild(seatPreferenceHeadingCellText);
                tableHeadingRow.appendChild(seatPreferenceHeadingCell);

                const foodPreferenceHeadingCell = document.createElement("td");
                const foodPreferenceHeadingCellText = document.createTextNode("Food preference");
                foodPreferenceHeadingCell.appendChild(foodPreferenceHeadingCellText);
                tableHeadingRow.appendChild(foodPreferenceHeadingCell);

                tblBody.appendChild(tableHeadingRow);

                // put the <tbody> in the <table>
                tbl.appendChild(tblBody);

                divForTable.appendChild(tbl);

                // appends <table> into <body>
                //document.body.appendChild(tbl);


                for (let i = 0; i < element.tickets.length; i++) {
                    if (element.tickets[i].ticketStatus != "cancelled") {
                        const row = document.createElement("tr"); for (let j = 0; j < 1; j++) {
                            // Create a <td> element and a text node, make the text
                            // node the contents of the <td>, and put the < td > at
                            // the end of the table row
                            const pnrCell = document.createElement("td");
                            const pnrCellText = document.createTextNode(element.tickets[i].pnr);
                            pnrCell.appendChild(pnrCellText);
                            row.appendChild(pnrCell);

                            const travelDateCell = document.createElement("td");
                            const travelDateCellText = document.createTextNode(element.tickets[i].travelDate);
                            travelDateCell.appendChild(travelDateCellText);
                            row.appendChild(travelDateCell);
                            //console.log("Travel date: " + element.tickets[i].travelDate);

                            const sourceCityCell = document.createElement("td");
                            const sourceCityCellText = document.createTextNode(element.tickets[i].sourceCity);
                            sourceCityCell.appendChild(sourceCityCellText);
                            row.appendChild(sourceCityCell);

                            const destinationCityCell = document.createElement("td");
                            const destinationCityCellText = document.createTextNode(element.tickets[i].destinationCity);
                            destinationCityCell.appendChild(destinationCityCellText);
                            row.appendChild(destinationCityCell);

                            const ticketStatusCell = document.createElement("td");
                            const ticketStatusCellText = document.createTextNode(element.tickets[i].ticketStatus);
                            ticketStatusCell.appendChild(ticketStatusCellText);
                            row.appendChild(ticketStatusCell);

                            const seatPreferenceCell = document.createElement("td");
                            const seatPreferenceCellText = document.createTextNode(element.tickets[i].seatPreference);
                            seatPreferenceCell.appendChild(seatPreferenceCellText);
                            row.appendChild(seatPreferenceCell);

                            const foodPreferenceCell = document.createElement("td");
                            const foodPreferenceCellText = document.createTextNode(element.tickets[i].foodPreference);
                            foodPreferenceCell.appendChild(foodPreferenceCellText);
                            row.appendChild(foodPreferenceCell);
                        }

                        const cancelButton = document.createElement("button");
                        const cancelButtonText = document.createTextNode("Cancel ticket");
                        cancelButton.appendChild(cancelButtonText);
                        row.appendChild(cancelButton);
                        cancelButton.addEventListener("click", () => {
                            if (confirm("Do you really want to cancel the ticket?") == true) {
                                element.tickets[i].ticketStatus = "cancelled";
                                window.localStorage.setItem("user", JSON.stringify(arrayOfUsers));
                                divForTable.removeChild(tbl);
                                ticketTable();
                            }
                        });

                        const editButton = document.createElement("button");
                        const editButtonText = document.createTextNode("Edit ticket");
                        editButton.appendChild(editButtonText);
                        row.appendChild(editButton);
                        editButton.addEventListener("click", (event) => {
                            //console.log(element.tickets[i]);
                            loggedInUser.pnrOfTheTicketToBeEdited = element.tickets[i].pnr;
                            window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

                            window.location.href = "updateTicket.html";
                        });

                        // add the row to the end of the table body
                        tblBody.appendChild(row);
                        // put the <tbody> in the <table>
                        tbl.appendChild(tblBody);

                        divForTable.appendChild(tbl);

                        // appends <table> into <body>
                        //document.body.appendChild(tbl);
                        // sets the border attribute of tbl to '2'
                        tbl.setAttribute("border", "5");

                        activeTicket++;
                    }
                }

                if (activeTicket == 0) {
                    divForTable.removeChild(tbl);
                    let noActiveTicket = document.createTextNode("No active ticket available");
                    divForTable.appendChild(noActiveTicket);
                }
            }
        })
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

