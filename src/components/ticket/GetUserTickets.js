import React, { useEffect, useState } from "react";
import { getTicketsByUser } from "../../api/ticket/TicketApi";
import { useStoreState } from "easy-peasy";


export default function GetUserTickets() {
  const user = useStoreState((state) => state.user.user);
  const userID = user?.length > 0 && user[0]?.id;

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    console.log("GetUserTickets userID", userID);
    if (userID) {
      getTicketsByUser(userID)
        .then((response) => {
          console.log("GetUserTickets response", response);
          setTickets(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user tickets:", error);
        });
    }
  }, [userID]);

  return (
    <div>
      {tickets.length > 0 ? (
        <ul>
          {tickets.map((ticket, index) => (
            <li key={index}>{ticket.id}</li>
          ))}
        </ul>
      ) : (
        <p>You dont have any tickets..</p>
      )}
    </div>
  );
}
