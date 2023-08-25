import React from "react";

import http from "../http";
import axios from "axios";

// is there a point to use async and wait here?

export async function apiRegister(values) {
  try {
    // using http for permissions check
    console.log("values in apiRegister", values);
    const response =
      await axios.post("http://127.0.0.1:8000/api/auth/register/", values);
    console.log("api response for apiRegister", values);
    return response;
  } catch (error) {
    console.log("error in apiRegister", error);
    throw error; // Re-throw the error to propagate it
  }
}



export async function ApiLogin(event) {
  try {
    // using http for permissions check
    const response =
      await http.post("http://127.0.0.1:8000/api/auth/login/", event);
    console.log("api response for apiLogin", response);
    return response;
  } catch (error) {
    console.log("error in ApiLogin", error.message);
    throw error; // Re-throw the error to propagate it
  }
}



export async function ApiLogout(data) {
  try {
    // using http for permissions check
    const response = await http.post("http://127.0.0.1:8000/api/auth/logout/", data);
    console.log("api response for ApiLogout", response);
    return response;
  } catch (error) {
    console.log("error in ApiLogout", error.message);
    throw error; // Re-throw the error to propagate it
  }
}



export async function getAllGroups() {
  try {
    // using http for permissions check
    const response = await http.get("http://127.0.0.1:8000/api/groups/");
    console.log("api response for getAllGroups", response.data);
    return response.data;
  } catch (error) {
    console.log("error in getAllGroups", error.message);
    throw error; // Re-throw the error to propagate it

  }
}


export async function ApiPasswordChange(data) {
  try {
    // using http for permissions check
    console.log(data, "change password data")
    const response = await http.put("http://127.0.0.1:8000/api/auth/password/change/", data);
    console.log("api response for ApiPasswordChange", response);
    return response;
  } catch (error) {
    console.log("error in ApiPasswordChange", error.message);
    throw error; 
  }
}
