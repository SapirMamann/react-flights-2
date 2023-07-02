import React from "react";

import http from "../http";


// Getting all flights from api
export const getAllFlights = async () => {
  // using http for permissions check
  const response = await http.get('http://127:0.0.1:8000/api/flights/');
  console.log("api response for getAllFlights", response);
  return response.data;
};



// Getting flight from api by passing id
export const getFlightByID = async (id) => {
  // using http for permissions check
  const response = await http.get(`http://127:0.0.1:8000/api/flights/${id}`);
  console.log("api response for getFlightByID", response);
  return response;
};



export const getFlightsByParameters= async (originCountry, destinationCountry, departureTime, landingTime) => {
  // using http for permissions check
  const response = await http.get(`http://127:0.0.1:8000/api/flights/`);  //add this function in django
  console.log("api response for getFlightsByParameters", response);
  return response;
};