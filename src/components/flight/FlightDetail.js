import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { date } from 'yup';

import http from '../../api/http';
import { getFlightByID } from '../../api/flight/FlightApi';


export default function FlightDetail(props) {
  const [flight, setFlight] = useState([]);
  
  // Switch date format 
  const departureDate = new Date(flight.departure_time);
  const formattedDate = departureDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const hour = departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const getFlight = () => {
    getFlightByID(props.id)
      .then(response => {
        console.log("getFlight in FlightDetail", response.data);
        setFlight(response.data);
      })
      .catch(error => {
        console.debug("getFlight in FlightDetail fetching error", error)
      });
  };

  useEffect(() => {
    getFlight();
  }, []);


  return (
    <div>
      <Card className="text-center">
        <Card.Body>
          {/* <Card.Title>Special title treatment</Card.Title> */}
          <Card.Text>
            <p id="departure_time">{formattedDate}</p>
            <p id="departure_hour">{hour}</p>
            <label htmlFor="remaining_tickets">Remaining tickets:</label>
            <p id="remaining_tickets">{flight.remaining_tickets}</p>
            {flight.origin_country} {flight.destination_country} with {flight.airline_company}
          </Card.Text>
          <Link to={`/flights/${flight.id}/book`} variant="btn btn-secondary">Select</Link>
        </Card.Body>
      </Card>
      <br/>
    </div>
  );
};
