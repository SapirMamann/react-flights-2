import React from "react";

import http from '../http';


export function addNewTicket(data) {
  // using http for permissions check
  const response = http.post('http://127.0.0.1:8000/api/tickets/', data);
  console.log("api response for addNewTicket", response, data);
  return response;
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


