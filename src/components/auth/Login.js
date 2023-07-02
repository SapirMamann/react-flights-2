import React, { useState, useEffect } from 'react';
import { Navigate, Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';


import http from '../../api/http';
import Input from '../common/Input';


export default function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const navigate = useNavigate();

  const LoginValidation = object().shape({
    username: string()
                      .required("username is required"),
    password: string()
                      .required("password is required")
  })

  const checkIfAuthenticated = () => {
    const loggedInUser = localStorage.getItem("access");
    if (loggedInUser) {
        setIsAuthenticated(loggedInUser);
    };
  };

  // I want to check if the user is logged in only once.
  useEffect(() => {
    checkIfAuthenticated();
  }, []);

  const submitHandler = (event) => {
    console.log('event', event)

    // Send a POST request to the API endpoint with the form data (event)
    http
        .post('http://127.0.0.1:8000/api/auth/login/', event)
        // ApiLogin(event)
        .then((response) => {
          console.log('response', response)
          // Save the refresh & access token to local storage
          localStorage.setItem("access", response.data.access)
          localStorage.setItem("refresh", response.data.refresh)
          // localStorage.setItem("user_name", event.username)
          navigate('/');
        })
        .catch((error) => {
          console.error(Object.entries(error.response.data))
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


  // IsAuthenticated (logged in) user cant access login page
  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  } 

  return( 
    <>
      <ToastContainer />
      <Formik
        initialValues={{
            username: "",
            password: "",
        }}
        onSubmit={(e) => submitHandler(e)}
        validationSchema={LoginValidation}
      >
        {() => {
          return (
            <Form>
            <div className="form-group">
                {/* <Form.Control type="text" name="username" placeholder="Username" />
                <Form.Control type="password" name="password" placeholder="Password" />
                <br/>
                <Button variant="primary" type="submit">Login</Button> */}
              </div>
                <Input type="text" name="username" placeholder="p"/>
                <Input type="password" name="password"/>
                <button type="submit">Login</button>    
              <hr/>
              <div>
                <p>Don't have an account?</p>
                <p> <Link to="/register">Register</Link></p>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  )
}


