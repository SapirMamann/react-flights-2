import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import { toast, ToastContainer } from "react-toastify";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import { getTicketsByUser } from "../../api/ticket/TicketApi";
import { PermissionDenied } from "../../api/auth/CheckGroup";
import "./Ticket.css";
import ticketQR from "../../images/ticket_qr.png"; // Import the image

export default function GetUserTickets() {
  //TODO: get all flights details of tickets
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

  const getFlightDetailsOfTicket = () => {
    try {
      //TODO: get all flights details of tickets
    } catch (error) {
      console.log("Error fetching flight details of ticket:", error);
    }
  };

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
                <header>
                  <div className="company-name">
                    {ticket.flight_no.airline_company.name}
                  </div>
                </header>
                <div className="airports">
                  <div className="airport">
                    <div className="airport-name">From</div>
                    <div className="airport-code">
                      {ticket.flight_no.origin_country.name}
                    </div>
                    <div className="dep-arr-label">Departure</div>
                    <div className="time">
                      {new Date(ticket.flight_no.departure_time).toLocaleString()}
                    </div>
                  </div>
                  <div className="airport">
                    <div className="airport-name">To</div>
                    <div className="airport-code">
                      {ticket.flight_no.destination_country.name}
                    </div>
                    <div className="dep-arr-label">Arrival</div>
                    <div className="time">
                      {new Date(ticket.flight_no.landing_time).toLocaleString()}
                    </div>
                  </div>
                </div>                
                <div className="qr">
                  <img
                    src={ticketQR}
                    alt="QR Code"
                    width={150} 
                    height={150} 
                  />
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
