import React from "react";

import http from "../http";


// Needs to be modified
// Getting user information.
export default async function getCurrentUserDetails() {
  const response = await http.get(
    "http://127.0.0.1:8000/api/users/get_current_user_details/"
  );
  // console.log("response", response.data)
  return response.data;
}



// Get user information by ID.
export function getUserByID(userID) {
  const response = http.get(`http://127.0.0.1:8000/api/users/${userID}/`);
  console.log("Api response for getUserByID", response);
  return response;
}
