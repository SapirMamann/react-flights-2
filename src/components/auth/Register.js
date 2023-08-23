import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { number, object, ref, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { default as bsForm } from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "react-toastify/dist/ReactToastify.css";

import { ApiLogin, apiRegister, getAllGroups } from "../../api/auth/AuthApi";
import { addNewCustomer } from "../../api/customer/CustomerApi";

export default function Register() {
  //TODO: permission denied when isauthenticate except isadmin that can add user
  
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  const RegisterValidation = object().shape({
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
    first_name: string()
      .required("First name is required")
      .min(2, "Must be at least 2 characters")
      .matches(/^[a-zA-Z]+$/, "Only alphabetical letters are allowed"),

    last_name: string()
      .required("Last name is required")
      .min(2, "Must be at least 2 characters")
      .matches(/^[a-zA-Z]+$/, "Only alphabetical letters are allowed"),

    address: string()
      .required("Address is required")
      .min(2, "Must be at least 2 characters"),

    phone: string()
      .required("Phone is required")
      .min(10, "Phone must be exactly 10 digits")
      .max(10, "Phone must be exactly 10 digits")
      .matches(/^[0-9]+$/, "Only numbers are allowed"),

    credit_card: string()
      .required("Credit card is required")
      .min(16, "Credit card must be exactly 16 digits")
      .max(16, "Credit card must be exactly 16 digits")
      .matches(/^[0-9]+$/, "Only numbers are allowed"),
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

  const submitHandler = async (values) => {
    //TODO: make the group required. cant do that because it has a problem with saving the value of the select and not sending the form for submission
    console.debug("values", values);

    const userCreationValues = {
      username: values.username.toLowerCase(),
      email: values.email,
      password: values.password,
      password2: values.password2,
      groups: "Customer",
    };
    console.log("userCreationValues", userCreationValues);

    // console.log("customerValues", customerCreationValues);

    try {
      apiRegister(userCreationValues)
        .then((response) => {
          console.log("response", response);
          //TODO: log the user after successful registration:
          if (response.status === 201) {
            // const user =
            const customerCreationValues = {
              user: response.data.id,
              first_name: values.first_name.toLowerCase(),
              last_name: values.last_name.toLowerCase(),
              address: values.address.toLowerCase(),
              phone: values.phone,
              credit_card: values.credit_card,
            };

            addNewCustomer(customerCreationValues)
              .then((response) => {
                console.log("response of creating customer", response);
                if (response.status === 201) {
                  // localStorage.setItem("customer_id", response.data.id)
                  toast.success("Registration successful. You can now login.");
                }
              })
              .catch((error) => {
                console.log("error creating customer", error);
                for (const [key, value] of Object.entries(
                  error.response.data
                )) {
                  toast.error(`RegisterCustomer failed. ${key}: ${value[0]}`, {
                    // toast.error(`Login failed. ${error.response.data.detail}`, {
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
          }
        })
        .catch((error) => {
          console.debug(error);
          console.log("Registration failed.", error.message);
          console.debug("RegisterCustomer failed", error.response.data);
          // Set an error message for the form
          for (const [key, value] of Object.entries(error.response.data)) {
            toast.error(`RegisterCustomer failed. ${key}: ${value[0]}`, {
              // toast.error(`Login failed. ${error.response.data.detail}`, {
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
    } catch (error) {
      console.debug("here", error);
      console.log("Registration failed.", error.message);
    }
  };

  useEffect(() => {
    // Fetch the groups from the API
    getGroups();
  }, []);

  return (
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
          username: "sapir",
          email: "sapir@outlook.com",
          password: "sapir1999",
          password2: "sapir1999",
          first_name: "",
          last_name: "",
          address: "",
          phone: "",
          credit_card: "",
        }}
        onSubmit={(values) => submitHandler(values)}
        validationSchema={RegisterValidation}
      >
        {() => {
          return (
            <Form style={{ width: "40%" }}>
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
              <br />
              <FloatingLabel controlId="first_name" label="First name">
                <Field
                  name="first_name"
                  type="text"
                  placeholder="First name"
                  as={bsForm.Control}
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="error"
                />
              </FloatingLabel>

              <FloatingLabel controlId="last_name" label="Last name">
                <Field
                  name="last_name"
                  type="text"
                  placeholder="Last name"
                  as={bsForm.Control}
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="error"
                />
              </FloatingLabel>

              <FloatingLabel controlId="address" label="Address">
                <Field
                  name="address"
                  type="text"
                  placeholder="Address"
                  as={bsForm.Control}
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="error"
                />
              </FloatingLabel>

              <FloatingLabel controlId="phone" label="phone">
                <Field
                  name="phone"
                  type="text"
                  placeholder="phone"
                  as={bsForm.Control}
                />
                <ErrorMessage name="phone" component="div" className="error" />
              </FloatingLabel>

              <FloatingLabel controlId="credit_card" label="Credit Card Number">
                <Field
                  name="credit_card"
                  type="text"
                  placeholder="Credit Card Number"
                  as={bsForm.Control}
                />
                <ErrorMessage
                  name="credit_card"
                  component="div"
                  className="error"
                />
              </FloatingLabel>

              <div className="d-grid gap-2">
                <Button type="submit" variant="secondary" size="lg">
                  Register
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
