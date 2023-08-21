import React from "react";
import { toast } from "react-toastify";

import { deleteAdmin } from "../../api/admin/AdminApi";


export const deleteAdminByID = (adminID) => {
  console.log("Button clicked for ID:", adminID);

  deleteAdmin(adminID)
    .then((response) => {
      console.log("api response for deleteAdminByID", response);
      console.log("api response for deleteAdminByID", response.status);
      if (response.status === 204) {
        toast.success("Admin deleted successfully.");
      } else {
        toast.error("Admin not deleted.");
      }
    })
    .catch((error) => {
      console.log("Admin not deleted, error:", error);
    });
};
