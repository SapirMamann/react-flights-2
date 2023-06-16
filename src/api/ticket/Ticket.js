import React from "react";

import http from '../http';


// Getting all tickets from api
export const getAllTickets = async () => {
  try {
    const response = await 
      // using http for permissions check
      http
        .get('http://127:0.0.1:8000/api/tickets/');
    return response.data;

    // return error if api call fails
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};



// Getting ticket from api
export const getTicketByID = async (id) => {
  try {
    const response = await 
      // using http for permissions check
      http
        .get(`http://127:0.0.1:8000/api/tickets/${id}`);
    return response.data;

    // return error if api call fails
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};



// Update ticket by passing ID
export const updateTicket = async (id) => {
  try {
    const response = await 
      // using http for permissions check
      http
        .put(`http://127:0.0.1:8000/api/tickets/${id}`);
    return response.data;

    // return error if api call fails
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};



// Delete ticket by passing ID
export const deleteTicket = async (id) => {
  try {
    const response = await 
      // using http for permissions check
      http
        .delete(`http://127:0.0.1:8000/api/tickets/${id}`);
    return response.data;

    // return error if api call fails
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};


