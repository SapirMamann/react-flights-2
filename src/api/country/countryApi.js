import React from "react";

import http from "../http";


// Getting all countries from api
export async function getAllCountries() {
  // using http for permissions check
  const response = await http.get('http://127.0.0.1:8000/api/countries/');
  console.log(response);
  return response.data;
};



// Getting country from api
export const getCountryByID = async (id) => {
  const response = await 
    // using http for permissions check
    http.get(`http://127.0.0.1:8000/api/countries/${id}`);
  return response.data;
};



// Update country by passing ID
export const updateCountry = async (id) => {
    const response = await 
      // using http for permissions check
      http.put(`http://127.0.0.1:8000/api/countries/${id}`);
    return response.data;
};



// Delete country by passing ID
export const deleteCountry = async (id) => {
    const response = await 
      // using http for permissions check
      http.delete(`http://127.0.0.1:8000/api/countries/${id}`);
    return response.data;
};