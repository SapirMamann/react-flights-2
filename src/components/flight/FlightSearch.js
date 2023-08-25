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

import FlightDetail from "./FlightDetail";
import { getAllCountries } from "../../api/country/CountryApi";
import { getFlightsByParameters } from "../../api/flight/FlightApi";

export default function FlightSearch() {
  const [originCountries, setOriginCountries] = useState([]);
  const [destinationCountries, setDestinationCountries] = useState([]);
  // const [departureTime, setDepartureTime] = useState(new Date());

  const [selectedOriginCountry, setSelectedOriginCountry] = useState("");
  const [selectedDestinationCountry, setSelectedDestinationCountry] =
    useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const [desiredFlights, setDesiredFlights] = useState([]);

  const animatedComponents = makeAnimated();
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
        // toast.error('Fetching error')
      });
  }, []);

  const searchFlightValidation = object().shape({
    // origin_country: string()
    //   .required("Origin country is required"),
    // destination_country: string().required("Destination country is required"),
    // departure_time: string().required("Departure time is required"),
  });

  // Making the origin countries an array (where each object has a value and label) so the Select can display countries:
  const options = originCountries.map((country) => ({
    value: country.id,
    label: country.name,
  }));

  // Handling the change of the origin country:
  const handleOriginCountryChange = (o_selectedOption) => {
    console.log("selectedOption", o_selectedOption.value);
    setSelectedOriginCountry(o_selectedOption.value);
  };

  // Handling the change of the destination country:
  const handleDestinationCountryChange = (d_selectedOption) => {
    console.log("dest selectedOption", d_selectedOption.value);
    setSelectedDestinationCountry(d_selectedOption.value);
  };

  // Handling the change of the time:
  const handleDateTimeChange = (date) => {
    console.log("date", date);
    setSelectedDateTime(date);
  };

  const submitHandler = (values) => {
    // console.log("here", selectedDestinationCountry, selectedOriginCountry)
    values.origin_country = selectedOriginCountry;
    values.destination_country = selectedDestinationCountry;
    values.departure_time = selectedDateTime.toISOString();
    console.log("values", values);

    getFlightsByParameters(values)
      .then((response) => {
        console.log("Response of flight search", response);
        if (response.status === 200) {
          //If there are flights, set the desiredFlights state to the response data:
          if (response.data.length > 0) {
            setDesiredFlights(response.data);
          }
        }
      })
      .catch((error) => {
        console.log("flight search error:", error.message);
        // console.warn(Object.entries(error.response))
        console.error(Object.entries(error.response.data));
        for (const [key, value] of Object.entries(error.response.data)) {
          toast.error(`Searching flights failed. ${value[0]}`, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };

  return (
    <div>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
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
                      // value={selectedOriginCountry}
                      onChange={handleOriginCountryChange}
                      // components={animatedComponents}
                      // styles={animatedComponentsStyles}
                      placeholder="Select origin country"
                    />
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="destination_country">To:</label>
                    <Select
                      name="destination_country"
                      id="destination_country"
                      options={options}
                      // value={selectedDestinationCountry}
                      onChange={handleDestinationCountryChange}
                      // components={animatedComponents}
                      // styles={animatedComponentsStyles}
                      placeholder="Select destination country"
                    />
                  </div>
                  {/* <div style={{ marginBottom: "10px" }}>
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
                </div> */}
                  <div>
                    <label>Departure time</label>
                    <DatePicker
                      selected={selectedDateTime}
                      onChange={(d_date) => handleDateTimeChange(d_date)}
                      dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
                      showTimeInput
                      timeInputLabel="Time:"
                      withPortal
                      name="departure_time"
                      placeholderText="Select"
                    />
                  </div>

                  <div>
                    <button
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      type="submit"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div>
        {/* Display the desired flights */}
        {desiredFlights.length > 0 && (
          <div>
            <h2>Desired Flights</h2>
            <ul>
              {desiredFlights.map((flight) => (
                <div key={flight.id}>
                  <FlightDetail id={flight.id} />
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
