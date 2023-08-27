import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { getTicketsByUser } from "../../api/ticket/TicketApi";
import { PermissionDenied } from "../../api/auth/CheckGroup";
import { deleteTicketByID } from "./DeleteTicketByID";
import ticketQR from "../../images/ticket_qr.png"; // Import the image
import "./Ticket.css";


export default function GetUserTickets() {
  // permission is allowed for customers only

  const user = useStoreState((state) => state.user.user);
  const userID = user?.length > 0 && user[0]?.id;
  const isAuthenticated = useStoreState((state) => state.user.isAuthenticated);

  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  const getUserTickets = (userID) => {
    getTicketsByUser(userID)
      .then((response) => {
        console.log("GetUserTickets response", response);
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user tickets:", error);
        toast.error("Error fetching user tickets:", error.message);
      });
  };

  const handleDeleteClick = (ticketID) => {
    deleteTicketByID(ticketID);
  };

  const getFlightDetails = (flightID) => {};

  useEffect(() => {
    if (isAuthenticated) {
      console.log("GetUserTickets userID", userID);
      getUserTickets(userID);
    } else {
      toast.error("You are not logged in. Redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, []);

  return (
    <div>
      <ToastContainer />
      {isAuthenticated ? (
        <div className="ticket-list">
          <h1>Your Tickets</h1>
          <br />
          {tickets && tickets.length > 0 ? (
            tickets.map((ticket, index) => (
              <div className="ticket" key={index}>
                <header className="header">
                  <div className="company-name">
                    {ticket.flight_no}
                    {/* {ticket.flight_no.airline_company.name} */}
                    <div className="delete-button">
                      <button onClick={() => handleDeleteClick(ticket.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </header>
                <div className="airports">
                  <div className="airport">
                    <div className="airport-name">From</div>
                    <div className="airport-code">
                      {/* {ticket.flight_no.origin_country.name} */}
                      {ticket.flight_no}
                    </div>
                    <div className="dep-arr-label">Departure</div>
                    <div className="time">
                      {new Date(ticket.flight_no.departure_time).toLocaleString()}
                    </div>
                  </div>
                  <div className="airport">
                    <div className="airport-name">To</div>
                    <div className="airport-code">
                      {/* {ticket.flight_no.destination_country.name} */}
                      {ticket.flight_no}
                    </div>
                    <div className="dep-arr-label">Arrival</div>
                    <div className="time">
                      {new Date(ticket.flight_no.landing_time).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="qr">
                  <img src={ticketQR} alt="QR Code" width={150} height={150} />
                </div>
              </div>
            ))
          ) : (
            <p>No tickets.</p>
          )}
        </div>
      ) : (
        <PermissionDenied />
      )}
    </div>
  );
}
