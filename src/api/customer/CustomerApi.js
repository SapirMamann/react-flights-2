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
    console.log("Error in addNewCustomer fetching", error.message);
  }
};



export const getAllCustomers = async () => {
  try {
    // using http for permissions check
    const response = await http.get(`http://127.0.0.1:8000/api/customers/`);
    console.log("api response for getAllCustomers", response);
    return response;
  } catch (error) {
    console.log("Error in getAllCustomers fetching", error);
  }
};



// Getting customer by its user id from api
export const getCustomerByUserID = async () => {
  try {
    // using http for permissions check
    const response = await http.get(`http://127.0.0.1:8000/api/customers/get_customer_by_user_id/`);
    console.log("api response for getCustomerByUserID", response);
    return response;
  } catch (error) {
    console.log("Error in getCustomerByUserID fetching", error);
  }
};



export const getCustomerByID = async (customerID) => {
  try {
    // using http for permissions check
    const response = await http.get(`http://127.0.0.1:8000/api/customers/${customerID}/`);
    console.log("api response for getCustomerByID", response, customerID);
    return response;
  } catch (error) {
    console.log("Error in getCustomerByID fetching", error.message);
  }
};



export const editCustomerByID = (customerID, customerEditValues) => {
  try {
    // using http for permissions check
    const response = http.put(
      `http://127.0.0.1:8000/api/customers/${customerID}/`, customerEditValues
    );
    console.log("Api response for editCustomerByID", customerID , customerEditValues );
    console.log("Api response for editCustomerByID", response, customerID);
    return response;
  } catch (error) {
    console.log("error for Api fetching of editCustomerByID ", error);
  }
};


export const deleteCustomer = async (customerID) => {
  console.log("Api response for deleteCustomerByID", customerID)
  try {
    // using http for permissions check
    const response = await http.delete(
      `http://127.0.0.1:8000/api/customers/${customerID}/`
    );
    console.log("api response for deleteCustomer", response);
    return response;
  } catch (error) {
    console.log("error in deleteCustomer", error.message);
    throw error; 
  }
};