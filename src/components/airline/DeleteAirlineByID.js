import React from "react";
import { toast } from "react-toastify";

import { deleteAirlineCompany } from "../../api/airline/AirlineApi";

export const deleteAirlineByID = (airlineID) => {
  console.log("Button clicked for ID:", airlineID);

  deleteAirlineCompany(airlineID)
    .then((response) => {
      console.log("api response for deleteAirlineCompany", response);
      console.log("api response for deleteAirlineCompany", response.status);
      if (response.status === 204) {
        toast.success("Airline deleted successful.");
      } else {
        toast.error("Airline not deleted.");
      }
    })
    .catch((error) => {
      console.log("Airline not deleted, error:", error);
    });
};
