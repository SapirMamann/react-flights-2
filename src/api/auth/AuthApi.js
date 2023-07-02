import React from "react";

import http from "../http";


// is there a point to use async and wait here?

// Getting login function from api
export async function ApiLogin(event) {
  // using http for permissions check
  const response = await http.post('http://127.0.0.1:8000/api/auth/login/', event);
  console.log("api response for apiLogin", response);
  return response;
};