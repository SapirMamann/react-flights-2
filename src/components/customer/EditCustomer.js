import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, ref, string } from "yup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Button from "react-bootstrap/Button";
import { default as bsForm } from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "react-toastify/dist/ReactToastify.css";
import { useStoreState } from "easy-peasy";

import {
  editCustomerByID,
  getCustomerByUserID,
} from "../../api/customer/CustomerApi";
import { PermissionDenied } from "../../api/auth/CheckGroup";
import { editUserByID } from "../../api/user/UserApi";


export default function EditCustomer() {
  const user = useStoreState((state) => state.user.user);
  const userID = user?.length > 0 && user[0]?.id;
  const isAuthenticated = useStoreState((state) => state.user.isAuthenticated);
  const [customerID, setCustomerID] = useState("");

  useEffect(() => {
    getCustomerByUserID()
      .then((response) => {
        console.log("Customerbyuserid info", response);
        setCustomerID(response.data.id);
      })
      .catch((error) => {
        console.log("Customer didnt info by user id", error);
      });
  }, []);


  const EditCustomerValidation = object().shape({
    username: string()
      .required("A username is required")
      .min(3, "Must be at least 3 characters"),

    email: string()
      .required("An email is required")
      .email("Valid email required"),

    password: string()
      .required("A password is required")
      .min(8, "Must be at least 8 characters"),

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

  const submitHandler = async (values) => {
    const userEditValues = {
      username: values.username.toLowerCase(),
      email: values.email,
      password: values.password,
    };

    console.log("userEditValues", userEditValues);

    editUserByID(userID, userEditValues)
      .then((response) => {
        console.log("response for userEditValues", response);
        //TODO: log the user after successful registration:
        if (response.status === 200) {
          const customerEditValues = {
            user: response.data.id,
            first_name: values.first_name.toLowerCase(),
            last_name: values.last_name.toLowerCase(),
            address: values.address.toLowerCase(),
            phone: values.phone,
            credit_card: values.credit_card,
          };
          // Send api request to update the customer info
          console.log("updateCustomerInfo", customerEditValues);

          editCustomerByID(customerID, customerEditValues)
            .then((response) => {
              if (response.status === 200) {
                console.log("response of edit customer", response, customerID);
                toast.success("Edited successfully.");
              }
            })
            .catch((error) => {
              console.log("error updating customer", error);
            });
        }
      })
      .catch((error) => {
        console.debug(error);
        console.log("Edit failed.", error.message);
        console.debug("Edit failed", error.response.data);
        // Set an error message for the form
        for (const [key, value] of Object.entries(error.response)) {
          toast.error(`Edit failed. ${key}: ${value[0]}`, {
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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div style={{ maxWidth: "500px", width: "100%", padding: "20px" }}>
        <ToastContainer />
        {isAuthenticated ? (
          <Formik
            initialValues={{
              username: user[0]?.username || "", // Using stored state to pre-populate the form
              email: user[0]?.email || "",
              password: "",
              first_name: "",
              last_name: "",
              address: "",
              phone: "",
              credit_card: "",
            }}
            onSubmit={(values) => submitHandler(values)}
            validationSchema={EditCustomerValidation}
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
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error"
                    />
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
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="error"
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="credit_card"
                    label="Credit Card Number"
                  >
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
                      Save
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        ) : (
          <PermissionDenied />
        )}
      </div>
    </div>
  );
}
