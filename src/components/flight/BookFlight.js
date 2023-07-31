import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CreateCustomer from '../customer/CreateCustomer';
import { getFlightByID } from '../../api/flight/FlightApi';
import { addNewTicket } from '../../api/ticket/TicketApi';
import { useStoreState } from 'easy-peasy';


export default function BookFlight() {
  const { flight_id } = useParams();
  // const user = useStoreState(state => state.user);
  const user = 'y'
  const [selectedFlight, setSelectedFlight] = useState([]);
  const data = { flight_no: flight_id, user: user }

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
    try {
      addNewTicket(data);
      console.log('booked');
    }catch (e){
      console.error('Booking failed', e)
    }
  };


  return (
    <div>
      {/* Display the selected flight summary */}
      <h1>Your trip to {selectedFlight.destination_country}</h1>
      {selectedFlight ? (
        <div>
          <div>
            <h2>Selected Flight</h2>
            <p>Flight Number: {selectedFlight.id}</p>
            <p>Departure: {selectedFlight.origin_country} {selectedFlight.departure_time}</p>
            <p>Destination: {selectedFlight.destination_country} {selectedFlight.landing_time}</p>
            <button onClick={bookingSubmissionHandler}>Book</button>
          </div>
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