import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { default as bsForm } from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { date, number, object, ref, shape, string } from "yup";
import { useStoreState } from "easy-peasy";

import { PermissionDenied } from "../../api/auth/CheckGroup";
import { getAllCountries } from "../../api/country/CountryApi";
import { getAirlineByUserID } from "../../api/airline/AirlineApi";
import { addNewFlight } from "../../api/flight/FlightApi";


export default function AddFlight() {
  // only airline company can add flights

  // TODO:
  // add api request of add flight
  // send value of coountries and not the name of them
  // add permission to airline company
  //handle submitttion

  const user = useStoreState((state) => state.user.user);
  const isAdmin = user?.length > 0 && user[0]?.is_superuser;
  const isAirlineCompany = user?.length > 0 && user[0]?.groups[0] === 1;

  const [airlineCompanyID, setAirlineCompanyID] = useState("");
  const [countries, setCountries] = useState([]);

  const [originCountry, setOriginCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");

  const [departureTime, setDepartureTime] = useState(new Date());
  const [landingTime, setLandingTime] = useState(new Date());

  // Making the origin countries an array (where each object has a value and label) so the Select can display countries:
  const options = countries.map((country) => ({
    value: country.id,
    label: country.name,
  }));

  const AddFlightValidation = object().shape({
    // Doesnt let submitting:
    // origin_country: string().required("Origin country is required"),
    // destination_country: string().required("Destination country is required"),
    // departure_time: string().required("Departure time is required"),
    // landing_time: string().required("Landing time is required"),
    remaining_tickets: number().required("Remaining Tickets field is required"),
  });

  const submitHandler = (values) => {
    values.airline_company = airlineCompanyID;
    values.origin_country = originCountry;
    values.destination_country = destinationCountry;
    values.departure_time = departureTime;
    values.landing_time = landingTime;
    console.log("form values", values);

    // Send a POST request to the API endpoint with the form data
    addNewFlight(values)
      .then((response) => {
        console.log("Add flight submit", response);
        console.log("Add flight submit", response.data);
        if (response.status === 201) {
          toast.success("Fligth added successfully!");
        } else {
          toast.error("Error when adding fligth");
        }
      })
      .catch((error) => {
        console.log("Creation error:", error.message);
        // console.warn(Object.entries(error.response))
        console.error(Object.entries(error.response.data));
        for (const [key, value] of Object.entries(error.response.data)) {
          toast.error(`Saving failed. ${value[0]}`, {
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

  useEffect(() => {
    // For displaying countries
    getAllCountries()
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        toast.error("Fetching error", error.name.message);
      });
  }, []);

  useEffect(() => {
    // For passing airline form field
    if (isAirlineCompany) {
      getAirlineByUserID()
        .then((response) => {
          console.log(response);
          setAirlineCompanyID(response.data.id);
        })
        .catch((error) => {
          console.log("AirlineByUserID error", error);
        });
    }
  }, []);

  return (
    <div>
      {isAirlineCompany ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ToastContainer />
          <Formik
            initialValues={{
              origin_country: "",
              destination_country: "",
              // departure_time: "2023-09-30T10:50:38Z",
              // landing_time: "2023-09-30T10:50:38Z",
              departure_time: "",
              landing_time: "",
              remaining_tickets: "",
            }}
            onSubmit={(values) => submitHandler(values)}
            validationSchema={AddFlightValidation}
          >
            {() => {
              return (
                <Form style={{ width: "40%" }}>
                  <h1>Add Flight</h1>
                  <div>
                    {/*Display countries with select: */}
                    <Field name="origin_country">
                      {({ field, form }) => (
                        <div>
                          <label htmlFor="origin_country">From:</label>
                          <Select
                            name="origin_country"
                            id="origin_country"
                            options={options}
                            as={bsForm.Control}
                            onChange={(e) => (
                              setOriginCountry(e.value),
                              console.log("origin country", e)
                            )}
                            //adding a style to the selector:
                            placeholder="Select origin country"
                          />
                          <ErrorMessage
                            name="origin_country"
                            component="div"
                            className="error"
                          />
                        </div>
                      )}
                    </Field>

                    {/*Display countries with select: */}
                    <label for="destination_country">To:</label>
                    <Select
                      name="destination_country"
                      id="destination_country"
                      options={options}
                      as={bsForm.Control}
                      onChange={(e) => (
                        setDestinationCountry(e.value),
                        console.log("destination country", e)
                      )}
                      placeholder="Select destination country"
                    />
                    <ErrorMessage
                      name="destination_country"
                      component="div"
                      className="error"
                    />

                    <label>Departure time</label>
                    <DatePicker
                      selected={departureTime}
                      onChange={(d_date) => (
                        setDepartureTime(d_date), console.log(d_date)
                      )}
                      dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
                      showTimeInput
                      timeInputLabel="Time:"
                      withPortal
                      name="departure_time"
                      placeholderText="Select"
                    />

                    <label>Landing time</label>
                    <DatePicker
                      selected={landingTime}
                      onChange={(e) => (setLandingTime(e), console.log(e))}
                      dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
                      showTimeInput
                      timeInputLabel="Time:"
                      withPortal
                      name="landing_time"
                      placeholderText="Select"
                    />

                    <FloatingLabel
                      controlId="floatingInput"
                      label="Remaining tickets"
                    >
                      <Field
                        name="remaining_tickets"
                        type="text"
                        placeholder="Remaining tickets"
                        as={bsForm.Control}
                      />
                      <ErrorMessage
                        name="remaining_tickets"
                        component="div"
                        className="error"
                      />
                    </FloatingLabel>
                  </div>

                  <div name="submit button" className="d-grid gap-2">
                    <Button type="submit" variant="secondary" size="lg">
                      Submit
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      ) : (
        <div>
          {PermissionDenied()}
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
}
