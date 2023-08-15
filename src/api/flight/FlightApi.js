import React from "react";

import http from "../http";

export function addNewFlight(data) {
  // try {
  //   // using http for permissions check
  //   console.log(data);
  //   const response = http.post("http://127.0.0.1:8000/api/countries/", data);
  //   console.log("api response for addNewCountry", response, data);
  //   return response;
  // } catch (error) {
  //   console.log("error in addNewCountry", error.message);
  // }
}


// Getting all flights from api.
export const getAllFlights = async () => {
  try {
    // using http for permissions check
    const response = await http.get("http://127.0.0.1:8000/api/flights/");
    console.log("Api response for getAllFlights", response);
    return response.data;
  } catch (error) {
    console.log("Api response for getAllFlights error", error);
  }
};



// Getting flight from api by passing id.
export const getFlightByID = (flightID) => {
  try {
    // using http for permissions check
    const response = http.get(`http://127.0.0.1:8000/api/flights/${flightID}/`);
    console.log("Api response for getFlightByID", response, flightID);
    return response;
  } catch (error) {
    console.log("Api response for getFlightByID error", error);
  }
};



// Getting flights by search parameters.
// export const getFlightsByParameters= async (originCountry, destinationCountry, departureTime, landingTime) => {
export const getFlightsByParameters = async (originCountry) => {
  try {
    // using http for permissions check
    const response = await http.get(
      `http://127.0.0.1:8000/api/searchflights/?origin_country=2/`
    ); //add this function in django
    console.log("Api response for getFlightsByParameters", response);
    return response;
  } catch (error) {
    console.log("Api response for getFlightsByParameters error", error);
  }
};



// For displaying flights based on their origin_country.
export const getFlightsByCountry = (country) => {
  try {
    // using http for permissions check
    // This view is set to "allow any permission"
    const response = http.get(
      `http://127.0.0.1:8000/api/get_flights/${country}/`
    );
    console.log("Api response for getFlightsByCountry", response);
    return response;
  } catch (error) {
    console.log("Api response for getFlightsByCountry error", error);
  }
};



// For editing flights based on their ID.
export const editFlightByID = (flight_id, data) => {
  try {
    // using http for permissions check
    const response = http.put(
      `http://127.0.0.1:8000/api/flights/${flight_id}/`,
      data
    );
    console.log("Api response for editFlightByID", data);
    console.log(flight_id);
    console.log("Api response for editFlightByID", response);
    return response;
  } catch (error) {
    console.log("Api response for editFlightByID error", error);
  }
};



export const deleteFlight = async (flightID) => {
  try {
    // using http for permissions check
    const response = await http.delete(
      `http://127.0.0.1:8000/api/flights/${flightID}/`
    );
    console.log("api response for deleteFlight", response);

    if (response.status === 204) {
      // Deletion successful with a "No Content" status
      return response;
    } else {
      // Unexpected response status
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.log("error in deleteFlight", error.message);
    // throw error; // Re-throw the error for the calling code to handle
  }
};
