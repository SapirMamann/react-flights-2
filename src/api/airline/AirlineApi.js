import React from "react";

import http from "../http";


export function addNewAirlineCompany(data) {
  try {
    // using http for permissions check
    console.log(data);
    const response = http.post("http://127.0.0.1:8000/api/airlines/", data);
    console.log("api response for addNewAirlineCompany", response, data);
    return response;
  } catch (error) {
    console.log("Error in addNewAirlineCompany", error.message);
  }
}


export const getAllAirlines = async () => {
  try {
    // using http for permissions check
    const response = await http.get("http://127.0.0.1:8000/api/airlines/");
    console.log("Api response for getAllAirlines", response);
    console.log("Api response for getAllAirlines", response.data);
    return response.data;
  } catch (error) {
    console.log("Error in getAllAirlines ", error);
  }
};