import React from "react";

import http from "../http";


// Getting all flights from api
export default async function GetCurrentUserData() {
  const response = await http.get('http://127.0.0.1:8000/api/users/get_current_user_details/');
  return response.data;
};