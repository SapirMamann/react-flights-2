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



// Getting customer by its user id from api
export const getCustomerByUserID = async () => {
  try {
    // using http for permissions check
    const response = await http.get(`http://127.0.0.1:8000/api/customers/get_customer_by_user_id/`);
    console.log("api response for getCustomerByUserID", response);
    return response;
  } catch (error) {
    console.log("Error in getCustomerByUserID", error);
  }
};



export const getCustomerByID = async (customerID) => {
  try {
    // using http for permissions check
    const response = await http.get(`http://127.0.0.1:8000/api/customers/${customerID}/`);
    console.log("api response for getCustomerByID", response, customerID);
    return response;
  } catch (error) {
    console.log("Error in getCustomerByID", error.message);
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
    console.log("error for Api response for editCustomerByID ", error);
  }
};

