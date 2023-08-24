import React from "react";
import { toast } from "react-toastify";

import { deleteCustomer } from "../../api/customer/CustomerApi";


export const deleteCustomerByID = (customerID) => {
  console.log("Button clicked for ID:", customerID);

  deleteCustomer(customerID)
    .then((response) => {
      console.log("api response for deleteCustomerByID", response);
      console.log("api response for deleteCustomerByID", response.status);
      if (response.status === 204) {
        toast.success("Customer deleted successfully.");
      } else {
        toast.error("Customer not deleted.");
      }
    })
    .catch((error) => {
      console.log("Customer not deleted, error:", error);
    });
};
