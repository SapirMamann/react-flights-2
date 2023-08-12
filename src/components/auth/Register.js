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


export default function Register() {
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

  useEffect(() => {
    // Fetch the groups from the API
    getGroups();
  }, []);

  const submitHandler = async (values) => {
    //TODO: make the group required. cant do that because it has a problem with saving the value of the select and not sending the form for submission
    console.debug("values", values);
    console.log(selectedGroup);
    values.groups = selectedGroup;
    console.debug("values", values);
    apiRegister(values)
      .then((response) => {
        console.log("response", response);
        //TODO: log the user after successful registration:
        if (response === 201) {
          // ApiLogin()
          toast.success("Registration successful. You can now login.")
        }
      })
      .catch((error) => {
        console.debug(error);
        console.log("Registration failed.", error.message);
        console.debug("Register failed", error.response.data);
        // Set an error message for the form
        for (const [key, value] of Object.entries(error.response.data)) {
          toast.error(`Register failed. ${key}: ${value[0]}`, {
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
  };

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={{
          username: "test",
          email: "test@example.com",
          password: "test1234",
          password2: "test1234",
          groups: "",
        }}
        onSubmit={(values) => submitHandler(values)}
        validationSchema={RegisterValidation}
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

              <FloatingLabel controlId="groups" label="Group">
                <Field
                  name="groups"
                  component={bsForm.Select}
                  as="select"
                  onChange={(e) => {
                    // console.log("selecttttt", e.target.value)
                    setSelectedGroup(e.target.value);
                  }}
                >
                  <option>Select a group</option>
                  {groups.map((group, index) => (
                    <option key={index}>
                      {/* {console.log(value)} */}
                      {group}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="groups" component="div" className="error" />
              </FloatingLabel>
              <br />

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
