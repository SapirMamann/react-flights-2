import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CreateCustomer from '../customer/CreateCustomer';
import { getFlightByID } from '../../api/flight/FlightApi';
import { addNewTicket } from '../../api/ticket/TicketApi';
import { useStoreState } from 'easy-peasy';


export default function BookFlight() {
  const navigate = useNavigate();
  const { flight_id } = useParams();
  // const user = useStoreState(state => state.user);
  const username = useStoreState((state) => state.user.username);

  const [selectedFlight, setSelectedFlight] = useState([]);
  const data = { flight_no: flight_id, user: 2 }

  const getFlightDetails = () => {
    getFlightByID(flight_id)
      .then(response => {
        console.log("getFlightDetails", response.data);
        setSelectedFlight(response.data);
      })
      .catch(error => console.debug("getFlightDetails in book flight fetching error", error))
  };

  useEffect(() => {
    getFlightDetails();
  }, []);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>30.07
  const bookingSubmissionHandler = () => {
    // add if user is not logged in then sent him to login page
    console.log("user ", username);
    if (username === "") {
      toast.error("Please log in first");
      console.log("user is not logged in");
      // return navigate('/login');
    }
    try {
      addNewTicket(data);
      console.log('booked');
    }catch (e){
      console.error('Booking failed', e);
    };
  };


  return (
    <div>
      <ToastContainer/>
      {/* Display the selected flight summary */}
      <h1>Your trip to {selectedFlight.destination_country}</h1>
      {selectedFlight ? (
        <div>
          <Card className="text-center">
            <Card.Header as="h5">Selected Flight</Card.Header>
            <Card.Body>
              <Card.Title>Flight Number: {selectedFlight.id}</Card.Title>
              <Card.Text>
                Departure: {selectedFlight.origin_country} {selectedFlight.departure_time}              </Card.Text>
                Destination: {selectedFlight.destination_country} {selectedFlight.landing_time}
              <Button onClick={bookingSubmissionHandler} variant="primary">Book</Button>
            </Card.Body>
          </Card>
          <div>
            <h2>Traveller information</h2>
            
            !!give form to create customer


            {/* if anonymous -> user needs to create user customer
            if logged (is customer/ not customer, he has to fill in formation)
              -> display customer fields */}
            <CreateCustomer/>
          </div>
        </div>
      ) : (
        <p>No flight selected.</p>
      )}
    </div>
  );
};