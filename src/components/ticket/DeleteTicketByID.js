import React from "react";
import { toast } from "react-toastify";

import { deleteTicket } from "../../api/ticket/TicketApi";


export const deleteTicketByID = (ticketID) => {
  deleteTicket(ticketID)
    .then((response) => {
      console.log("api response for deleteTicketByID", response);
      console.log("api response for deleteTicketByID", response.status);
      if (response.status === 204) {
        toast.success("Ticket deleted successful.");
      } else {
        toast.error("Ticket not deleted.");
      }
    }).catch((error) => { 
      console.log("error in deleteTicketByID", error.message);
      toast.error("Error in api call deleteTicketByID", error.message);
    })
};
