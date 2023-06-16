import React from 'react'
import { Formik, Form, setFieldError } from "formik";
import { number, object, ref, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer, toast } from 'react-toastify';

import Input from '../common/Input';
import http from '../../api/http';


export default function Register() {
  const navigate = useNavigate();

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
                .oneOf([ref('password')], 'Passwords must match'),

    user_role: number()
                .required("Group is required"),
  });

  const submitHandler = async (values) => {
    console.debug(values);
  
    const response = await 
      http
        .post('http://localhost:8000/api/auth/register/', values)
        .then((response) => {
          console.log('response', response)
          // If it worked -> redirect to home page
          navigate('/');
        })
        .catch((error) => {
          console.log(response.status);
          console.log('Registration failed.', error.message)
          console.debug(error)
          console.debug('Register failed', error.response.data)
          // Set an error message for the form
          // for (const [key, value] of Object.entries(error.response.data)) {
          //   toast.error(`Register failed. ${key}: ${value[0]}`, {
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
          }
        )
  }


  return (
    <>
    <ToastContainer />
    <Formik
      initialValues={{
        username: "",
        email: "@.com",
        password: "",
        password2: "",
        user_role: ""
      }}
      onSubmit={(e) => submitHandler(e)}
      validationSchema={RegisterValidation}
    >
    {() => {
      return (
        <Form className='input'>
          <div>
            <Input type="text" name="username" label="Username"/>
            <Input type="text" name="email" label="Email"/>
            <Input type="password" name="password" label="Password"/>
            <Input type="password" name="password2" label="Password"/>
            <br/>
            <label>Choose group</label>
            <br/>
            <select name="user_role">
              <option value="1">Administrator</option>    
              <option value="3">Airline company</option>
              <option selected value="2">Customer</option>
            </select>
          <div >
            <button type="submit">Register</button>
          </div>
          </div>
            <p className='center_input'>Already have an account?
              <Link to="/login" className='center_link'>Login</Link>
            </p>
        </Form>
      );
    }}
    </Formik>
  </>
  )
}
