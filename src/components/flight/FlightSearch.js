import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, setFieldError } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { object, ref, string, date, shape } from "yup";

import { getAllCountries } from "../../api/country/CountryApi";
import { getFlightsByParameters } from "../../api/flight/FlightApi";

export default function FlightSearch() {
  const [originCountries, setOriginCountries] = useState([]);
  const [destinationCountries, setDestinationCountries] = useState([]);
  const [departureTime, setDepartureTime] = useState(new Date());

  const [desiredFlights, setDesiredFlights] = useState([]);

  const [selectedOriginCountry, setSelectedOriginCountry] = useState("");
  const [selectedDestinationCountry, setSelectedDestinationCountry] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const animatedComponents = makeAnimated();

  // const navigate = useNavigate();

  const animatedComponentsStyles = {
    control: (provided) => ({
      ...provided,
      border: "1px solid gray",
      borderRadius: "4px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "lightblue" : "white",
      color: state.isFocused ? "white" : "black",
    }),
  };

  const submitHandler = (event) => {
    console.log("values", event);
    // console.log("Origin Country:", values.origin_country);
    // console.log("Destination Country:", values.destination_country);
    // console.log("Departure Time:", values.departure_time);
    // console.log('selectedOriginCountry', selectedOriginCountry[value])
    // getFlightsByParameters(selectedOriginCountry[value])
    //   .then((response) => {
    //     console.log("Response of flight search", response);
    //   })
    //   .catch((error) => {
    //     console.log("creation error:", error.message);
    //     // console.warn(Object.entries(error.response))
    //     console.error(Object.entries(error.response.data));
    //     for (const [key, value] of Object.entries(error.response.data)) {
    //       toast.error(`Searching flights failed. ${value[0]}`, {
    //         position: "top-left",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //     }
    //   });
  };

  useEffect(() => {
    getAllCountries()
      .then((response) => {
        console.log("FlightSearch useeffect getAllCountries", response);
        setOriginCountries(response.data);
        console.log("originCountries", response.data);
        setDestinationCountries(response.data);
      })
      .catch((error) => {
        console.log("FlightSearch useeffect getAllCountries error", error);
      });
  }, []);

  const searchFlightValidation = object().shape({
    origin_country: string().required("Origin country is required"),
    //  .min(3, "Must be at least 3 characters"),
    destination_country: string().required("Destination country is required"),
    departure_time: string().required("Departure time is required"),
  });

  // Making the origin countries an array (where each object has a value and label) so the Select can display countries:
  const options = originCountries.map((country) => ({
    value: country.id,
    label: country.name,
  }));

  // Handling the change of the origin country:
  const handleOriginCountryChange = (selectedOption) => {
    console.log("selectedOption", selectedOption);
    setSelectedOriginCountry(selectedOption);
  };

  // Handling the change of the destination country:
  const handleDestinationCountryChange = (selectedOption) => {
    setSelectedDestinationCountry(selectedOption);
  };

  // Handling the change of the time:
  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
  };
  

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <ToastContainer />
      <Formik
        initialValues={{
          origin_country: "",
          destination_country: "",
          departure_time: "",
        }}
        onSubmit={(e) => submitHandler(e)}
        validationSchema={searchFlightValidation}
      >
        {() => {
          return (
            <Form>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: "10px" }}>
                  <label htmlFor="origin_country">From:</label>
                  <Select
                    name="origin_country"
                    id="origin_country"
                    options={options}
                    value={selectedOriginCountry}
                    onChange={handleOriginCountryChange}
                    components={animatedComponents}
                    styles={animatedComponentsStyles}
                    placeholder="Select origin country"
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label htmlFor="destination_country">To:</label>
                  <Select
                    name="destination_country"
                    id="destination_country"
                    options={options}
                    value={selectedDestinationCountry}
                    onChange={handleDestinationCountryChange}
                    components={animatedComponents}
                    styles={animatedComponentsStyles}
                    placeholder="Select destination country"
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label htmlFor="departure_time">Departure time:</label>
                  <DatePicker
                    name="departure_time"
                    id="departure_time"
                    selected={departureTime}
                    onChange={(date) => {
                      handleDateTimeChange(date);
                    }}
                    dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
                    showTimeInput
                    timeInputLabel="Time:"
                    withPortal
                  />
                </div>
                <div>
                  <button style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }} type="submit">Search</button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
