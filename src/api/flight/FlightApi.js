import React from "react";

import http from "../http";


// Getting all flights from api
export const getAllFlights = async () => {
  try {
    const response = await 
      // using http for permissions check
      http
        .get('http://127:0.0.1:8000/api/flights/');
    return response.data;

    // return error if api call fails
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};



// Getting flight from api by passing id
export const getFlightByID = async (id) => {
  try {
    const response = await 
      // using http for permissions check
      http
        .get(`http://127:0.0.1:8000/api/flights/${id}`);
    return response.data;
    
    // return error if api call fails
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};


export function getFlightsByParameters(originCountry, destinationCountry, departureTime, landingTime){
  try{
    const response = await 
      // using http for permissions check
      http
        .get(`http://127:0.0.1:8000/api/flights/`);  //add this function in django
    return response.data;
    
    // return error if api call fails
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};