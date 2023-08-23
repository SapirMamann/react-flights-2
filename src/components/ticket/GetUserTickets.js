import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import { toast } from "react-toastify";

import { getTicketsByUser } from "../../api/ticket/TicketApi";
import { PermissionDenied } from "../../api/auth/CheckGroup";


export default function GetUserTickets() {
  //TODO: get all flights details of tickets
  // permission is allowed for customers only

  const user = useStoreState((state) => state.user.user);
  const userID = user?.length > 0 && user[0]?.id;
  const isAuthenticated = useStoreState((state) => state.user.isAuthenticated);

  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  const getUserTickets = (userID) => {
    try {
      getTicketsByUser(userID)
        .then((response) => {
          console.log("GetUserTickets response", response);
          setTickets(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user tickets:", error);
        });
    } catch (error) {
      console.error("Error fetching user tickets:", error);
    }
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Check if user  is logged in */}
      { (isAuthenticated) ? (
        <div className="w-80">
          {tickets.length > 0 ? (
            <ListGroup>
              <ListGroup.Item className="font-weight-bold">
                Your Tickets
              </ListGroup.Item>
              {tickets.map((ticket, index) => (
                <ListGroup.Item key={index}>
                  Ticket ID: {ticket.id}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <Alert variant="info">You don't have any tickets.</Alert>
          )}
        </div>
      ) : (
        <PermissionDenied />
      )}
    </div>
  );
}
