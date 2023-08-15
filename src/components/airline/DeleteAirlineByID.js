import React from "react";
import { toast } from "react-toastify";

import { deleteAirlineCompany } from "../../api/airline/AirlineApi";


export const deleteAirlineByID = (airlineID) => {
  try {
    console.log("Button clicked for ID:", airlineID);
    deleteAirlineCompany(id).then((response) => {
      console.log("api response for deleteAirlineCompany", response);
      console.log("api response for deleteAirlineCompany", response.status);
      if (response.status === 204) {
        toast.success("Airline deleted successful.");
      } else {
        toast.error("Airline not deleted.");
      }
    });
  } catch (error) {
    console.log("Api error in deleteAirlineByID", error);
  }
};
