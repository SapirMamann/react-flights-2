import React from "react";

import http from "../http";


// Getting all flights from api.
export const getAllFlights = async () => {
  // using http for permissions check
  const response = await http.get('http://127.0.0.1:8000/api/flights/');
  console.log("Api response for getAllFlights", response);
  return response.data;
};



// Getting flight from api by passing id.
export const getFlightByID = (flightID) => {
  // using http for permissions check
  const response = http.get(`http://127.0.0.1:8000/api/flights/${flightID}/`);
  console.log("Api response for getFlightByID", response, flightID);
  return response;
};



// Getting flights by search parameters.
// export const getFlightsByParameters= async (originCountry, destinationCountry, departureTime, landingTime) => {
export const getFlightsByParameters = async (originCountry) => {
  try {
    // using http for permissions check
    const response = await http.get(`http://127.0.0.1:8000/api/searchflights/?origin_country=2/`);  //add this function in django
    console.log("Api response for getFlightsByParameters", response);
    return response;
  } catch (error) {
    console.log("Api response for getFlightsByParameters error", error);
  }
};



// For displaying flights based on their origin_country.
export const getFlightsByCountry = (country) => {
  // using http for permissions check
  // This view is set to "allow any permission"
  const response = http.get(`http://127.0.0.1:8000/api/get_flights/${country}/`);
  console.log("Api response for getFlightsByCountry", response);
  return response;
};



// For editing flights based on their ID.
export const editFlightByID = (flight_id, data) => {
  // using http for permissions check
  const response = http.put(`http://127.0.0.1:8000/api/flights/${flight_id}/`, data);
  console.log("Api response for editFlightByID", data);
  console.log(flight_id)
  console.log("Api response for editFlightByID", response);
  return response;
};