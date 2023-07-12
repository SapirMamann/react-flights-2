import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { date } from 'yup';

import http from '../../api/http';


export default function FlightDetail(props) {
  const [flight, setFlight] = useState([]);
  
  // Switch date format 
  const departureDate = new Date(flight.departure_time);
  const formattedDate = departureDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  
  //Getting flight details from api, i need to use the function from api folder
  const getflight = async () => {
    //needs to be changed
    const response = await 
    http
      .get(`http://localhost:8000/api/flights/${props.id}`)
      .then((response) => {
        setFlight(response.data)
        console.log(response.data)})
      .catch(error => {
        console.log('Getting flight detail error', error)
      })
  }

  useEffect(() => {
    getflight();
  }, [])


  return (
    <div>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            <p id="departure_time">{formattedDate}</p>
            <label htmlFor="remaining_tickets">Remaining tickets:</label>
            <p id="remaining_tickets">{flight.remaining_tickets}</p>
            
            {flight.origin_country} {flight.destination_country} with {flight.airline_company}
          </Card.Text>
          <Link to={`/flights/${flight.id}/book`} variant="btn btn-secondary">Book</Link>
        </Card.Body>
      </Card>
      <br/>
    </div>
  );
}

