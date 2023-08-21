import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { number, object, ref, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { default as bsForm } from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "react-toastify/dist/ReactToastify.css";

import { ApiLogin, apiRegister } from "../../api/auth/AuthApi";
import { addNewAdmin } from "../../api/admin/AdminApi";

export default function AddAdmin() {
  const navigate = useNavigate();

  const AddAdminValidation = object().shape({
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

    first_name: string()
      .required("First name is required")
      .min(2, "Must be at least 2 characters")
      .matches(/^[a-zA-Z]+$/, "Only alphabetical letters are allowed"),

    last_name: string()
      .required("Last name is required")
      .min(2, "Must be at least 2 characters")
      .matches(/^[a-zA-Z]+$/, "Only alphabetical letters are allowed"),
  });

  const submitHandler = async (values) => {
    const userCreationValues = {
      username: values.username.toLowerCase(),
      email: values.email,
      password: values.password,
      password2: values.password2,
      groups: "Administrator",
    };
    // console.log("userCreationValues", userCreationValues);

    try {
      apiRegister(userCreationValues)
        .then((response) => {
          console.log(
            "response for apiregister in addNewAdmin",
            response,
            "id:",
            response.data.id
          );
          //TODO: log the user after successful registration:
          if (response.status === 201) {
            const adminCreationValues = {
              user: response.data.id,
              first_name: values.first_name.toLowerCase(),
              last_name: values.last_name.toLowerCase(),
            };
            try {
              addNewAdmin(adminCreationValues);
              toast.success("Registration successful. You can now login.");
              setTimeout(() => {
                navigate("/login");
              }, 2000);
            } catch (error) {
              console.log("error in addNewAdmin", error.message);
            }
          }
        })
        .catch((error) => {
          console.debug(error);
          console.log("Registration failed.", error.message);
          console.debug("addNewAdmin failed", error.response.data);
          // for (const [key, value] of Object.entries(error.response.data)) {
          //   toast.error(`AddNewadmin failed. ${key}: ${value[0]}`, {
          toast.error(`Login failed. ${error.response.data}`, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } catch (error) {
      console.debug("here", error);
      console.log("Registration failed.", error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={{
          username: "sapir",
          email: "sapir@outlook.com",
          password: "sapir1999",
          password2: "sapir1999",
          // groups: "",
          first_name: "",
          last_name: "",
        }}
        onSubmit={(values) => submitHandler(values)}
        validationSchema={AddAdminValidation}
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
                  onChange={(e) => {
                    console.log("selecttttt", e.target.value)
                    setSelectedGroup(e.target.value);
                  }}
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

              <div className="d-grid gap-2">
                <Button type="submit" variant="secondary" size="lg">
                  Register
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
