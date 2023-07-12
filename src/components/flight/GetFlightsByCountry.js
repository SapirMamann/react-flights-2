import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import http from '../../api/http';
import FlightDetail from './FlightDetail';
import { getFlightsByCountry } from '../../api/flight/FlightApi';


export default function GetFlightsByCountryId(props) {
  // Get the country name from url:
  const {country} = useParams();
  const [flights, setFlights] = useState([]);
  const [clickedFlightId, setClickedFlightId] = useState(null);

  const getFlightsData = () => {
    getFlightsByCountry(country)
      .then(response => {
        console.log("getFlightsData", response.data);
        setFlights(response.data);
      })
      .catch(error => console.debug("getFlightsData fetching error", error))
  };

  useEffect(() => {
    getFlightsData();
  }, []);

  // const handleClick = (flightId) => {
  //   if (flightId === clickedFlightId) {
  //     setClickedFlightId(null);
  //   } else {
  //     setClickedFlightId(flightId);
  //   };
  // };

  return (
    <div>
      <h1>Book a flight to {country.charAt(0).toUpperCase() + country.slice(1)}</h1>
      
      {flights ? (
        // Display the filtered data 
        flights.map(flight => (      
          <div key={flight.id}>
            <FlightDetail
              id={flight.id}
              // country={country}
              // airline_company={flight.airline_company}
              // remaining_tickets={flight.remaining_tickets}
            />
            {/* {flight.id === clickedFlightId && (
              <Flight
              />
            )} */}
          </div>
        ))
        ) : (
        // If there are no flights ->
        <p>No flights available..</p>
      )}
    </div>
  );
};
