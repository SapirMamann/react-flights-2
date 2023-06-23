import React from "react";

import http from "../http";


// Getting all flights from api
export const getAllFlights = async () => {
    const response = await 
      // using http for permissions check
      http.get('http://127:0.0.1:8000/api/flights/');
    return response.data;
};



// Getting flight from api by passing id
export const getFlightByID = async (id) => {
    const response = await 
      // using http for permissions check
      http.get(`http://127:0.0.1:8000/api/flights/${id}`);
    return response.data;
};



export function getFlightsByParameters(originCountry, destinationCountry, departureTime, landingTime){
    const response = await 
      // using http for permissions check
      http
        .get(`http://127:0.0.1:8000/api/flights/`);  //add this function in django
    return response.data;
};