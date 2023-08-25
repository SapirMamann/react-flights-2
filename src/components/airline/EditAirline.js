import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { object, string } from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useStoreState } from "easy-peasy";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { default as bsForm } from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import { updateCountry } from "../../api/country/CountryApi";
import { getAllCountries } from "../../api/country/CountryApi";
import { updateAirlineCompany } from "../../api/airline/AirlineApi";
import { PermissionDenied } from "../../api/auth/CheckGroup";


export default function EditAirline(props) {
  //TODO: add user information edit

  const user = useStoreState((state) => state.user.user);
  const isAdmin = user?.length > 0 && user[0]?.is_staff;

  const { airline_id } = useParams();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const getCountries = () => {
    getAllCountries()
      .then((response) => {
        const countryNames = response.data.map((country) => country.name);
        console.log(response.data);
        setCountries(response.data);
      })
      .catch((error) => console.debug("getCountries fetching error", error));
  };

  useEffect(() => {
    // Fetch countries from the API
    getCountries();
    console.log("airlineID", airline_id);
  }, []);

  const EditAirlineValidation = object().shape({
    name: string()
      .required("Name is required")
      .min(3, "Must be at least 3 characters")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Only alphabetical letters and spaces are allowed"
      ),
  });

  const submitHandler = (values) => {
    // turn name input to lower cased
    values.name = values.name.toLowerCase();
    values.country = selectedCountry;
    console.log("values", values);
    if (values.country.length > 0) {
      // Send a put request to the API endpoint with the form data
      updateAirlineCompany(airline_id, values)
        .then((response) => {
          console.log(response);
          // console.log(response.data);
          if (response.status === 200) {
            toast.success("Airline edited successfully!");
            return response;
          }
        })
        .catch((error) => {
          console.debug(error);
          console.debug("updateAirlineCompany failed", error.response.data);
          // Set an error message for the form
          for (const [key, value] of Object.entries(error.response.data)) {
            toast.error(`updateAirlineCompany failed. ${key}: ${value[0]}`, {
              // toast.error(`Login failed. ${error.response.data.detail}`, {
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
        });
    } else {
      toast.error(`Country is required`, {
        // toast.error(`Login failed. ${error.response.data.detail}`, {
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
  };

  return (
    <>
      {isAdmin ? (
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
              name: "",
              country: "",
            }}
            onSubmit={(e) => submitHandler(e)}
            validationSchema={EditAirlineValidation}
          >
            {() => {
              return (
                <Form style={{ width: "40%" }}>
                  <div>
                    <div>
                      <FloatingLabel controlId="floatingInput" label="Name">
                        <Field
                          name="name"
                          type="text"
                          placeholder="Name"
                          as={bsForm.Control}
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="error"
                        />
                      </FloatingLabel>
                    </div>

                    <FloatingLabel controlId="country" label="Country">
                      <Field
                        name="country"
                        component={bsForm.Select}
                        as="select"
                        onChange={(e) => {
                          // console.log("selecttttt", e)
                          // console.log("selecttttt", e.target.value)
                          setSelectedCountry(e.target.value);
                        }}
                      >
                        <option>Select a country</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="country"
                        component="div"
                        className="error"
                      />
                    </FloatingLabel>

                    <div name="submit button" className="d-grid gap-2">
                      <Button type="submit" variant="outline-dark">
                        Save
                      </Button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      ) : (
        <div>
          {PermissionDenied()}
        </div>
      )}
    </>
  );
}
