import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { object, ref, string, date, shape } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { default as bsForm } from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import DatePicker from "react-datepicker";

import { PermissionDenied } from "../../api/auth/CheckGroup";
import { addNewCountry } from "../../api/country/CountryApi";
import { useStoreState } from "easy-peasy";

export default function AddFlight() {
  const user = useStoreState((state) => state.user.user);
  const [isAdmin, setIsAdmin] = useState(false);

  const AddFlightValidation = object().shape({
    origin_country: string().required("Origin country is required"),
    destination_country: string().required("Destination country is required"),
    departure_time: string().required("Departure time is required"),
    landing_time: string().required("Landing time is required"),
    remaining_tickets: string().required("Remaining Tickets field is required"),
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

  useEffect(() => {
    if (user.length > 0) {
      setIsAdmin(user[0].is_staff);
    }
  }, []);

  return (
    <div>
      {isAdmin ? (
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
                <Form name="Edit-flight-form">
                  <h1>Add Flight #</h1>
                  <div>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Airline company"
                    >
                      <Field
                        name="airline_company"
                        type="text"
                        placeholder="Airline company"
                        as={bsForm.Control}
                        // value={ flight_id } readOnly
                      />
                      <ErrorMessage
                        name="airline_company"
                        component="div"
                        className="error"
                      />
                    </FloatingLabel>

                    {/* //trying to display it with select: */}

                    {/* <label for="origin_country">From:</label>
                <Select 
                  name="origin_country"
                  id="origin_country"
                  options={options}
                  // value={selectedOriginCountry}
                  // onChange={handleOriginCountryChange}
                  //adding a style to the selector:
                  components={animatedComponents}
                  styles={animatedComponentsStyles}  
                  placeholder="Select origin country"              
                />
                <ErrorMessage name="origin_country" component="div" className="error" /> */}

                    <FloatingLabel
                      controlId="floatingInput"
                      label="Origin country"
                    >
                      <Field
                        name="origin_country"
                        type="text"
                        placeholder="Origin country"
                        as={bsForm.Control}
                        // value={id} readOnly
                      />
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="floatingInput"
                      label="Destination country"
                    >
                      <Field
                        name="destination_country"
                        type="text"
                        placeholder="Destination country"
                        as={bsForm.Control}
                        // value={id} readOnly
                      />
                      <ErrorMessage
                        name="destination_country"
                        component="div"
                        className="error"
                      />
                    </FloatingLabel>

                    {/* <label>Departure time</label>
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
                    /> */}
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Remaining tickets"
                    >
                      <Field
                        name="remaining_tickets"
                        type="text"
                        placeholder="Remaining tickets"
                        as={bsForm.Control}
                        // value={id} readOnly
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
          {/* {PermissionDenied()}
          <Link to="/login">Login</Link> */}
        </div>
      )}
    </div>
  );
}
