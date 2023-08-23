import React from "react";
import { toast } from "react-toastify";

import { deleteFlight } from "../../api/flight/FlightApi";


export const deleteFlightByID = (FlightID) => {
  try {
    console.log("Button clicked for ID:", FlightID);
    deleteFlight(FlightID).then((response) => {
      console.log("api response for deleteFlightCompany", response);
      console.log("api response for deleteFlightCompany", response.status);
      if (response.status === 204) {
        toast.success("Flight deleted successful.");
      } else {
        toast.error("Flight not deleted.");
      }
    });
  } catch (error) {
    console.log("Api error in DeleteFlightByID", error);
  }
};
