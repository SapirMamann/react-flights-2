import React from "react";

import http from "../http";


export function addNewCustomer(data) {
  try {
    // using http for permissions check
    console.log(data);
    const response = http.post('http://127.0.0.1:8000/api/customers/', data);
    console.log("api response for addNewCustomer", response, data);
    return response;
  } catch (error) {
    console.log("Error in addNewCustomer", error.message);
  }
};



// // Getting all countries from api
// export function getAllCountries() {
//   // using http for permissions check
//   const response = http.get('http://127.0.0.1:8000/api/countries/');
//   console.log("api response for getAllCountries", response);
//   return response;
// };



// Getting customer by its user id from api
export const getCustomerByUserID = async (UserID) => {
  try {
    // using http for permissions check
    const response = await http.get(`http://127.0.0.1:8000/api/customers/${UserID}`);
    console.log("api response for getCustomerByID", response, UserID);
    return response;
  } catch (error) {
    console.log("Error in getCustomerByID", error.message);
  }
};



export const getCustomerByID = async (customerID) => {
  try {
    // using http for permissions check
    const response = await http.get(`http://127.0.0.1:8000/api/customers/${customerID}`);
    console.log("api response for getCustomerByID", response, customerID);
    return response;
  } catch (error) {
    console.log("Error in getCustomerByID", error.message);
  }
};



// // Update country by passing ID
// export const updateCountry = async (id) => {
//   // using http for permissions check
//   const response = await http.put(`http://127.0.0.1:8000/api/countries/${id}`);
//   console.log("api response for updateCountry", response);
//   return response;
// };



// // Delete country by passing ID
// export const deleteCountry = async (id) => {
//   // using http for permissions check
//   const response = await http.delete(`http://127.0.0.1:8000/api/countries/${id}`);
//   console.log("api response for deleteCountry", response);
//   return response;
// };