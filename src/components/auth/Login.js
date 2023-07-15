import React, { useState, useEffect } from 'react';
import { Navigate, Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import {default as bsForm} from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import {isAuthenticated} from '../../api/http.js';
import {ApiLogin} from '../../api/auth/AuthApi';


export default function Login() {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();

  const loginValidation = object().shape({
    username: string()
                      .required("username is required"),
    password: string()
                      .required("password is required")
  });

  const submitHandler = (event) => {
    console.log('login submission', event);
    // Send a POST request to the API endpoint with the form data (event)
    ApiLogin(event)
        .then((response) => {
          console.log('Response of login fetching', response)
          // Save the refresh & access token to local storage
          localStorage.setItem("access", response.data.access)
          localStorage.setItem("refresh", response.data.refresh)
          // localStorage.setItem("user_name", event.username)
          // After a successful login, redirect the user to the home page
          navigate('/');
        })
        .catch((error) => {
          console.error("Login fetching error", Object.entries(error.response.data))
          toast.error(`Login failed. ${error.response.data.detail}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
  };


  // Logged in user can't access login page
  // Replace used for if the user clicks the back button, they will skip the previous route and go further back in the history stack
  if (isLoggedIn) {
    console.log("Authenticated user cant access login page")
    return <Navigate replace to="/"/>;
  }; 

  // Otherwise return login form: 
  return( 
    <>
      <ToastContainer />
      <Formik
        initialValues={{
            username: "",
            password: "",
        }}
        onSubmit={(e) => submitHandler(e)}
        validationSchema={loginValidation}
      >
        {() => {
          return (
            <Form>
              <div>                
                <FloatingLabel controlId="floatingInput" label="Username">
                  <Field
                    name="username"
                    type="text"
                    placeholder="Username"
                    as={bsForm.Control}
                  />
                </FloatingLabel>
              </div>
              <div>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    as={bsForm.Control}
                  />
                </FloatingLabel>
              </div>
              <br/>
              <div name="submit button" className="d-grid gap-2">
                <Button type="submit" variant="secondary" size="lg">
                  Login
                </Button>
              </div>

              <hr/>
              <div>
                <p>Don't have an account?</p>
                <p><Link to="/register">Register</Link></p>
              </div>
              
            </Form>
          );
        }}
      </Formik>
    </>
  )
}

