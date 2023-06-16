import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { date } from 'yup';

import http from '../../api/http';

export default function FlightDetail(props) {
  const [flight, setFlight] = useState([])
  
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
    <div className='flight'>
      <p>
        <small>Departure:</small> {formattedDate}
        <br/>
        <small>Remaining tickets:</small> {flight.remaining_tickets}
      </p>
      <br/>
      {flight.origin_country}{flight.destination_country} with {flight.airline_company}
    </div>
  );
}

