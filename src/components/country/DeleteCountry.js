import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

import { deleteCountry } from "../../api/country/CountryApi";


export default function DeleteCountry(props) {
  //The ID is passed from getCountries..
  const { id } = props;

  const deleteCountryHandler = (event) => {
    // event.preventDefault();
    console.log("event", event);

    // // Send a delete request to the API endpoint with the data
    try {
      deleteCountry(id)
        .then((response) => {
          console.log("here", response);
          toast.success("Country deleted successfully!");
        })
        .catch((error) => {
          console.log("deletion error:", error.message);
          if (error.response) {
            for (const [key, value] of Object.entries(error.response)) {
              toast.error(`Saving failed. ${value[0]}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          } else {
            console.log("Error response not available:", error);
          }
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <Button
        onClick={(e) => {
          deleteCountryHandler(e);
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </>
  );
}
