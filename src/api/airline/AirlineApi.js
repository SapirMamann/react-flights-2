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
    console.log("error in addNewAirlineCompany", error.message);
  }
}

