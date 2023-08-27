import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import { getFlightByID } from "../../api/flight/FlightApi";
import { addNewTicket } from "../../api/ticket/TicketApi";
import { useStoreState } from "easy-peasy";

export default function BookFlight() {
  const user = useStoreState((state) => state.user.user);
  const userID = user?.length > 0 && user[0]?.id;
  const isCustomer = user?.length > 0 && user[0]?.groups[0] === 2;

  const navigate = useNavigate();
  const { flight_id } = useParams();

  const [selectedFlight, setSelectedFlight] = useState([]);
  const data = { flight_no: flight_id, user: userID };

  const getFlightDetails = () => {
    getFlightByID(flight_id)
      .then((response) => {
        console.log("getFlightDetails", response.data);
        setSelectedFlight(response.data);
      })
      .catch((error) =>
        console.debug("getFlightDetails in book flight fetching error", error)
      );
  };

  const bookingSubmissionHandler = () => {
    console.log(user);
    // console.log("user not in, ", user === "")
    // If user is not logged in then navigate to login
    if (user.length > 0) {
      console.log(data);
      // send api request to add ticket
      if (selectedFlight.remaining_tickets === 0) {
        toast.error("No tickets available for this flight.");
        return;
      } else {
        // If there are tickets available, then book
        try {
          addNewTicket(data)
            .then((response) => {
              console.log("booked", response);
              toast.success(
                "Thank you for booking. Redirecting to your tickets page..."
              );
              setTimeout(() => {
                navigate("/my_tickets");
              }, 2000);
            })
            .catch((error) => {
              console.error("Booking failed", error);
              toast.error(error.response.data.error);
            });
        } catch (error) {
          console.error("Booking failed", error);
        }
      }
    } else {
      toast.error("Redirecting to login page...");
      console.log("user is not logged in");
      // Delay navigation by 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  useEffect(() => {
    getFlightDetails();
  }, []);

  return (
    <div>
      <ToastContainer />
      {/* Display the selected flight summary */}
      <h1>Your trip to {selectedFlight.destination_country}</h1>
      {selectedFlight ? (
        <div>
          <Card className="text-center">
            <Card.Header as="h5">Selected Flight</Card.Header>
            <Card.Body>
              <Card.Title>Flight Number: {selectedFlight.id}</Card.Title>
              <Card.Text>
                Departure: {selectedFlight.origin_country}
                <br />
                {selectedFlight.departure_time}
              </Card.Text>
              <Card.Text>
                Destination: {selectedFlight.destination_country}
                <br />
                {selectedFlight.landing_time}
                {isCustomer ? (
                  <Button onClick={bookingSubmissionHandler} variant="primary">
                    Book
                  </Button>
                ) : (
                  <div
                    style={{
                      border: "1px solid #ccc",
                      padding: "1px",
                      borderRadius: "24px",
                      color: "blue",
                    }}
                  >
                    <p>Sign in as a customer to book this flight</p>
                  </div>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
          <div
            style={{ textAlign: "center", margin: "0 auto", maxWidth: "600px" }}
          ></div>
        </div>
      ) : (
        <p>No flight selected.</p>
      )}
    </div>
  );
}
