import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getFlightByID } from '../../api/flight/FlightApi';
import { useState } from 'react';


export default function BookFlight() {
  const {flight_id} = useParams();
  const [flight, setFlight] = useState();

  const getFlightDetails = () => {
      getFlightByID(flight_id)
          .then(response => {
            console.log("getFlightDetails", response.data);
            setFlight(response.data);
          })
          .catch(error => console.debug("getFlightDetails fetching error", error))
  };

  useEffect(() => {
    getFlightDetails();
  }, []);


  return (
    <div>
        //needs that token refresh 
      <h1>Your trip to {flight.destination_country}</h1>
    </div>
  );
};