import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import http from '../../api/http';
import FlightDetail from '../../components/flight/FlightDetail';

export default function GetFlightsByCountryId(props) {
  const {country} = useParams();
  const [flights, setFlights] = useState([]);
  const [clickedFlightId, setClickedFlightId] = useState(null);

  const getData = async () => {
    http
      .get(`http://127.0.0.1:8000/api/get_flights/${country}`)
      .then(response => {
        setFlights(response.data)
        console.log("yes",response)
      })
      .catch(error => {console.log(error)});
  }

  useEffect(() => {
    getData();
  }, []);

  const handleClick = (flightId) => {
    if (flightId === clickedFlightId) {
      setClickedFlightId(null);
    } else {
      setClickedFlightId(flightId);
    };
  };

  return (
    <div>
      
      <h1 className='title'>Book a flight to {country.charAt(0).toUpperCase() + country.slice(1)} </h1>

      {/* If there are no flights -> */}
      {flights.length === 0 ? (
        <p className=''>No flights available..</p>
      ) : (

      // Display the filtered data 
      flights.map(flight => (      
        <div key={flight.id} className='flight__box'>
        
          <FlightDetail
            id={flight.id}
            // country={country}
            // airline_company={flight.airline_company}
            // remaining_tickets={flight.remaining_tickets}
          />
          {/* 
          
          

          */}
          <Link to={`/flights/${flight.id}/book`} className='book__link'>
            Book
          </Link>
          {/* {flight.id === clickedFlightId && (
            <Flight
            />
          )} */}

          
        </div>
      ))
      )}
    </div>
  );
};
