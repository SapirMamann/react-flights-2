import React from "react";

import http from "../http";


// is there a point to use async and wait here?

export function addNewCountry(data) {
  // using http for permissions check
  const response = http.post('http://127.0.0.1:8000/api/countries/', data);
  console.log("api response for addNewCountry", response, data);
  return response;
};



// Getting all countries from api
export function getAllCountries() {
  // using http for permissions check
  const response = http.get('http://127.0.0.1:8000/api/countries/');
  console.log("api response for getAllCountries", response);
  return response;
};



// Getting country from api
export const getCountryByID = async (id) => {
  // using http for permissions check
  const response = await http.get(`http://127.0.0.1:8000/api/countries/${id}`);
  console.log("api response for getCountryByID", response);
  return response;
};



// Update country by passing ID
export const updateCountry = async (id) => {
  // using http for permissions check
  const response = await http.put(`http://127.0.0.1:8000/api/countries/${id}`);
  console.log("api response for updateCountry", response);
  return response;
};



// Delete country by passing ID
export const deleteCountry = async (id) => {
  // using http for permissions check
  const response = await http.delete(`http://127.0.0.1:8000/api/countries/${id}`);
  console.log("api response for deleteCountry", response);
  return response;
};