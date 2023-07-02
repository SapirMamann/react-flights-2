import React from "react";

import http from "../http";


// is there a point to use async and wait here?

// Getting all countries from api
export async function getAllCountries() {
  // using http for permissions check
  const response = await http.get('http://127.0.0.1:8000/api/countries/');
  console.log("api response for getAllCountries", response);
  return response.data;
};



// Getting country from api
export const getCountryByID = async (id) => {
  // using http for permissions check
  const response = await http.get(`http://127.0.0.1:8000/api/countries/${id}`);
  console.log("api response for getCountryByID", response);
  return response.data;
};



// Update country by passing ID
export const updateCountry = async (id) => {
  // using http for permissions check
  const response = await http.put(`http://127.0.0.1:8000/api/countries/${id}`);
  console.log("api response for updateCountry", response);
  return response.data;
};



// Delete country by passing ID
export const deleteCountry = async (id) => {
  // using http for permissions check
  const response = await http.delete(`http://127.0.0.1:8000/api/countries/${id}`);
  console.log("api response for deleteCountry", response);
  return response.data;
};