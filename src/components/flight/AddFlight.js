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
import { date, object, ref, shape, string } from "yup";
import makeAnimated from "react-select/animated";

import { useStoreState } from "easy-peasy";
import { PermissionDenied } from "../../api/auth/CheckGroup";
import { getAllCountries } from "../../api/country/CountryApi";
// import { isAirlineCompany1 } from "../../state/user";

export default function AddFlight() {
  // TODO:
  // add api request of add flight
  // send value of coountries and not the name of them
  // add permission to airline company 
  //handle submitttion
  
  const user = useStoreState((state) => state.user.user);
  const [isAdmin, setIsAdmin] = useState(false);
  const isAirlineCompany = user?.length > 0 && user[0]?.groups[0] === 1;
  
  const [originCountries, setOriginCountries] = useState([]);
  const [departureTime, setDepartureTime] = useState(new Date());
  const [landingTime, setLandingTime] = useState(new Date());
  
  const animatedComponents = makeAnimated();
  
    // Making the origin countries an array (where each object has a value and label) so the Select can display countries:
    const options = originCountries.map((country) => ({
      value: country.id,
      label: country.name,
    }));
  
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

  useEffect(() => {
    if (user.length > 0) {
      setIsAdmin(user[0].is_staff);
    }
  }, []);
  
  const AddFlightValidation = object().shape({
    origin_country:
      string().required("Origin country is required"),
    destination_country:
      string().required("Destination country is required"),
    departure_time:
      string().required("Departure time is required"),
    landing_time:
      string().required("Landing time is required"),
    remaining_tickets:
      string().required("Remaining Tickets field is required"),
    });
    
    const submitHandler = (values) => {
      console.log("form values", values);
      // Send a POST request to the API endpoint with the form data
    // addNewCountry(values)
    //   .then((response) => {
      //     console.log("Add country fetching", response.data);
      //     toast.success("Country added successfully!");
      //   })
      //   .catch((error) => {
        //     console.log("creation error:", error.message);
        //     // console.warn(Object.entries(error.response))
        //     console.error(Object.entries(error.response.data));
        //     for (const [key, value] of Object.entries(error.response.data)) {
          //       toast.error(`Saving failed. ${value[0]}`, {
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

  
  // Style for countries selector
  const animatedComponentsStyles = {
    control: (provided) => ({
      ...provided,
      border: "1px solid light grey",
      borderRadius: "4px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "lightblue" : "white",
      color: state.isFocused ? "black" : "black",
    }),
  };


  return (
    <div>
      {isAdmin || isAirlineCompany ? (
        <div>
          <ToastContainer />
          <Formik
            initialValues={{
              airline_company: "",
              origin_country: "",
              destination_country: "",
              departure_time: "2023-09-30T10:50:38Z",
              landing_time: "2023-09-30T10:50:38Z",
              remaining_tickets: "",
            }}
            onSubmit={(values) => submitHandler(values)}
            validationSchema={AddFlightValidation}
          >
            {() => {
              return (
                <Form>
                  <h1>Add Flight #</h1>
                  <div>
                    {/* should be id */}
                    <FloatingLabel controlId="floatingInput" label="Airline company">
                      <Field
                        name="airline_company"
                        type="text"
                        placeholder="Airline company"
                        as={bsForm.Control}
                        value={ 9 } readOnly
                      />
                      <ErrorMessage
                        name="airline_company"
                        component="div"
                        className="error"
                      />
                    </FloatingLabel>

                    {/*Display countries with select: */}
                    {/* should be id */}
                    <Field name="origin_country">
                      {({ field, form }) => (
                        <div>
                          <label htmlFor="origin_country">From:</label>
                          <Select
                            {...field}
                            id="origin_country"
                            options={options}
                            as={bsForm.Control}
                            components={animatedComponents}
                            styles={animatedComponentsStyles}
                            placeholder="Select origin country"
                          />
                          <ErrorMessage name="origin_country" component="div" className="error" />
                        </div>
                      )}
                    </Field>

                    {/*Display countries with select: */}
                    {/* should be id */}
                    <label for="destination_country">To:</label>
                      <Select 
                        name="destination_country"
                        id="destination_country"
                        options={options}
                        as={bsForm.Control}
                        // value={selectedOriginCountry}
                        // onChange={handleOriginCountryChange}
                        //adding a style to the selector:
                        components={animatedComponents}
                        styles={animatedComponentsStyles}  
                        placeholder="Select destination country"              
                      />
                    <ErrorMessage name="destination_country" component="div" className="error" />
{/* 
                    <FloatingLabel controlId="floatingInput" label="Origin country">
                      <Field
                        name="origin_country"
                        type="text"
                        placeholder="Origin country"
                        as={bsForm.Control}
                      />
                      <ErrorMessage
                        name="destination_country"
                        component="div"
                        className="error"
                      />
                    </FloatingLabel> */}

                    {/* <FloatingLabel controlId="floatingInput" label="Destination country">
                      <Field
                        name="destination_country"
                        type="text"
                        placeholder="Destination country"
                        as={bsForm.Control}
                      />
                      <ErrorMessage
                        name="destination_country"
                        component="div"
                        className="error"
                      />
                    </FloatingLabel> */}

                    <label>Departure time</label>
                    <DatePicker
                      selected={departureTime}
                      onChange={(date) => (
                        setDepartureTime(date), console.log(date)
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
                      onChange={(date) => setLandingTime(date)}
                      dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
                      showTimeInput
                      timeInputLabel="Time:"
                      withPortal
                      name="landing_time"
                      placeholderText="Select"
                    />

                    <FloatingLabel controlId="floatingInput" label="Remaining tickets">
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
