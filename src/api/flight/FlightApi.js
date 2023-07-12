import React from "react";

import http from "../http";


// Getting all flights from api.
export const getAllFlights = async () => {
  // using http for permissions check
  const response = await http.get('http://127.0.0.1:8000/api/flights/');
  console.log("api response for getAllFlights", response);
  return response.data;
};



// Getting flight from api by passing id.
export const getFlightByID = async (id) => {
  // using http for permissions check
  const response = await http.get(`http://127.0.0.1:8000/api/flights/${id}`);
  console.log("api response for getFlightByID", response);
  return response;
};



// Getting flights by search parameters.
// export const getFlightsByParameters= async (originCountry, destinationCountry, departureTime, landingTime) => {
export const getFlightsByParameters = async (originCountry) => {
  // using http for permissions check
  const response = await http.get(`http://127.0.0.1:8000/api/searchflights/?origin_country=2`);  //add this function in django
  console.log("api response for getFlightsByParameters", response);
  return response;
};



// For displaying flights based on their origin_country.
export const getFlightsByCountry = (country) => {
  // using http for permissions check
  // This view is set to "allow any permission"
  const response = http.get(`http://127.0.0.1:8000/api/get_flights/${country}`);
  console.log("api response for getFlightsByCountry", response);
  return response;
};