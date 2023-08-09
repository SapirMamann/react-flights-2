import React from "react";

import http from "../http";

// is there a point to use async and wait here?

export function addNewCountry(data) {
  try {
    // using http for permissions check
    console.log(data);
    const response = http.post("http://127.0.0.1:8000/api/countries/", data);
    console.log("api response for addNewCountry", response, data);
    return response;
  } catch (error) {
    console.log("error in addNewCountry", error.message);
  }
}

// Getting all countries from api
export function getAllCountries() {
  try {
    // using http for permissions check
    const response = http.get("http://127.0.0.1:8000/api/countries/");
    console.log("api response for getAllCountries", response);
    return response;
  } catch (error) {
    console.log("error in getAllCountries", error.message);
  }
}



// Getting country from api
export const getCountryByID = async (id) => {
  // using http for permissions check
  const response = await http.get(`http://127.0.0.1:8000/api/countries/${id}/`);
  console.log("api response for getCountryByID", response);
  return response;
};



// Update country by passing ID
export const updateCountry = async (id, data) => {
  try {
    console.log("updateCountry api", id, data);
    // using http for permissions check
    const response = await http.put(
      `http://127.0.0.1:8000/api/countries/${id}/`,
      data
    );
    console.log("api response for updateCountry", response);
    return response;
  } catch (error) {
    console.log("error in updateCountry", error.message);
  }
};

export const deleteCountry = async (id) => {
  try {
    // using http for permissions check
    const response = await http.delete(
      `http://127.0.0.1:8000/api/countries/${id}/`
    );
    console.log("api response for deleteCountry", response);

    if (response.status === 204) {
      // Deletion successful with a "No Content" status
      return response;
    } else {
      // Unexpected response status
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.log("error in deleteCountry", error.message);
    throw error; // Re-throw the error for the calling code to handle
  }
};
