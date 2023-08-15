import React from "react";

import http from "../http";


export function addNewTicket(data) {
  try {
    // using http for permissions check
    const response = http.post("http://127.0.0.1:8000/api/tickets/", data);
    console.log("api response for addNewTicket", response, data);
    return response;
  } catch (error) {
    console.log("Error in addNewTicket ", error);
  }
}



export const getTicketsByUser = async (user_id) => {
  try {
    // using http for permissions check
    const response = await http.get(
      `http://127.0.0.1:8000/api/my_tickets/${user_id}/`
    );
    console.log("Api response for getAllAirlines", response);
    console.log("Api response for getAllAirlines data", response.data);
    return response;
  } catch (error) {
    console.log("Error in getAllAirlines ", error);
  }
};

// Getting all tickets from api
// export const getAllTickets = async () => {
//   // using http for permissions check
//   const response = await http.get('http://127:0.0.1:8000/api/tickets/');
//   return response;
// };

// // Getting ticket from api
// export const getTicketByID = async (id) => {
//   // using http for permissions check
//   http.get(`http://127:0.0.1:8000/api/tickets/${id}`);
//   return response.data;
// };

// // Update ticket by passing ID
// export const updateTicket = async (id) => {
//   // using http for permissions check
//   http.put(`http://127:0.0.1:8000/api/tickets/${id}`);
//   return response.data;
// };

// // Delete ticket by passing ID
// export const deleteTicket = async (id) => {
//   // using http for permissions check
//   http.delete(`http://127:0.0.1:8000/api/tickets/${id}`);
//   return response.data;
// };
