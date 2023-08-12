import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { number, object, ref, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { default as bsForm } from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "react-toastify/dist/ReactToastify.css";

import { ApiLogin, getAllGroups, apiRegister } from "../../api/auth/AuthApi";
import { getAllCountries } from "../../api/country/CountryApi";
import { addNewAirlineCompany } from "../../api/airline/AirlineApi";


export default function RegisterAirlineCompany() {
  //TODO: only admin can access it
  // get all countries as a select input.
  // send the user, name and country to the api view of create airline company as well as a create user 
  // turn name to lower case
  
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  // const [selectedGroup, setSelectedGroup] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const RegisterAirlineCompanyValidation = object().shape({
    username: string()
      .required("A username is required")
      .min(3, "Must be at least 3 characters"),

    email: string()
      .required("An email is required")
      .email("Valid email required"),

    password: string()
      .required("A password is required")
      .min(8, "Must be at least 8 characters"),

    password2: string()
      .required("This field is required")
      .min(8, "Must be at least 8 characters")
      .oneOf([ref("password")], "Passwords must match"),

    // groups: string()
    //   .required("Group is required"),

    name: string()
      .required("A name is required")
      .min(3, "Must be at least 3 characters"),

  });

  const getGroups = () => {
    getAllGroups()
      .then((response) => {
        const groupNames = response.map((group) => group.name);
        // console.log(groupNames);
        setGroups(groupNames);
      })
      .catch((error) => console.debug("getGroups fetching error", error));
  };

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
    // Fetch the groups and countries from the API
    getGroups();
    getCountries();
  }, []);

  const submitHandler = async (values) => {
    //TODO: make the group required. cant do that because it has a problem with saving the value of the select and not sending the form for submission
    
    const userCreationValues = {
      username: values.username,
      email: values.email,
      password: values.password,
      password2: values.password2,
      groups: "Airline company"
    };

    try {
      apiRegister(userCreationValues)
        .then((response) => {
          console.log("response", response);
          //TODO: log the user after successful registration:
          if (response.status === 201) {
            // const user = 
            const airlinrCreationValues = {
              user: response.data.id,
              name: values.name,
              country: parseInt(selectedCountry) 
            }
            try {
              addNewAirlineCompany(airlinrCreationValues)
              toast.success("Registration successful. You can now login.")
            } catch (error) {
              console.log("error in addNewAirlineCompany", error.message);
            }
          }
        }).catch((error) => {
              console.debug(error);
              console.log("Registration failed.", error.message);
              console.debug("RegisterAirlineCompany failed", error.response.data);
              // Set an error message for the form
              for (const [key, value] of Object.entries(error.response.data)) {
                toast.error(`RegisterAirlineCompany failed. ${key}: ${value[0]}`, {
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
    } catch (error) {
      console.debug("here",error);
      console.log("Registration failed.", error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={{
          username: "test",
          email: "test@example.com",
          password: "sapir1999",
          password2: "sapir1999",
          groups: "",
          name: "",
          country: "",
        }}
        onSubmit={(values) => submitHandler(values)}
        validationSchema={RegisterAirlineCompanyValidation}
      >
        {() => {
          return (
            <Form>
              <FloatingLabel controlId="username" label="Username">
                <Field
                  name="username"
                  type="text"
                  placeholder="Username"
                  as={bsForm.Control}
                  autoComplete="username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error"
                />
              </FloatingLabel>

              <FloatingLabel controlId="email" label="Email">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  as={bsForm.Control}
                />
                <ErrorMessage name="email" component="div" className="error" />
              </FloatingLabel>

              <FloatingLabel controlId="password" label="Password">
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  as={bsForm.Control}
                  autoComplete="current-password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </FloatingLabel>

              <FloatingLabel controlId="password2" label="Password">
                <Field
                  name="password2"
                  type="password"
                  placeholder="Password"
                  as={bsForm.Control}
                  autoComplete="current-password"
                />
                <ErrorMessage
                  name="password2"
                  component="div"
                  className="error"
                />
              </FloatingLabel>

              {/* <FloatingLabel controlId="groups" label="Group">
                <Field
                  name="groups"
                  component={bsForm.Select}
                  as="select"
                  disabled  
                  value="Airline company" 
                >
                  <option>Select a group</option>
                  {groups.map((group, index) => (
                    <option key={index}>
                      {console.log(value)}
                      {group}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="groups" component="div" className="error" />
              </FloatingLabel> */}
              <br />

              <FloatingLabel controlId="name" label="Name">
                <Field
                  name="name"
                  type="text"
                  placeholder="Name"
                  as={bsForm.Control}
                  // readOnly
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error"
                />
              </FloatingLabel>

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
                  {countries.map((country, index ) => (
                    <option key={index} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="country" component="div" className="error" />
              </FloatingLabel>
              <br />

              <div className="d-grid gap-2">
                <Button type="submit" variant="secondary" size="lg">
                  RegisterAirlineCompany
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
