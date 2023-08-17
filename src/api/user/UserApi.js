import React from "react";
import axios from "axios";

import http from "../http";


export default async function getCurrentUserDetails() {
  try {
    const token = localStorage.getItem("access");
    const response = await axios.get(
      "http://127.0.0.1:8000/api/users/get_current_user_details/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Api response for getCurrentUserDetails", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching getCurrentUserDetails:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};



// Get user information by ID.
export function getUserByID(userID) {
  try {
    const response = http.get(`http://127.0.0.1:8000/api/users/${userID}/`);
    console.log("Api response for getUserByID", response);
    return response;
  } catch (error) {
    console.error("Error getUserByID:", error);
    throw error;
  }
};


// For editing users based on their ID.
export const editUserByID = (userID, data) => {
  try {
    // using http for permissions check
    const response = http.put(
      `http://127.0.0.1:8000/api/users/${userID}/`, data
    );
    console.log("Api response and data for editUserByID", response, data, userID);
    return response;
  } catch (error) {
    console.log("Api response for editUserByID error", error);
  }
};