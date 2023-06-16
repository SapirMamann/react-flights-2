import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, setFieldError } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import { object, ref, string, date, shape } from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { CheckGroup } from '../../api/auth/CheckGroup';
import Input from '../common/Input';
import http from '../../api/http';


// Function for editing countries 
export default function EditCountry(props) {
  //The ID is passed from getCountries..
  const {id} = props

  const EditCountryValidation = object().shape({
    name: string()
                .required("Name is required")
                .min(2, "Must be at least 2 characters"),
    })

  const submitHandler = (event) => {
    // event.preventDefault();
    console.log(event)
    const data = event;

    // turn name input to lower cased
    data.name = data.name.toLowerCase();
        
    // Send a POST request to the API endpoint with the form data
    http.put(`http://127.0.0.1:8000/api/countries/${id}/`, data)
        .then(
          response => {
            console.log(response.data)
            toast.success('Country edited successfully!');
        })
        .catch(error => {
          console.log('creation error:', error.message)
          // console.warn(Object.entries(error.response))
          console.error(Object.entries(error.response.data))
          for (const [key, value] of Object.entries(error.response.data)) {
            toast.error(`Saving failed. ${value[0]}`, {
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
        })
  };

  
  return (
    <>
      <CheckGroup groups={['Administrator']}>
        <ToastContainer/>
        <Formik
          initialValues={{
            name: "4",
          }}
          onSubmit={(e) => submitHandler(e)}
          validationSchema={EditCountryValidation}
          >
          {() => {
            return (
              <Form className='input'>
                <div>
                  <Input type="text" name="name" label="Name"/>
                  <button type="submit">Save</button>
                </div>
              </Form>
            );
          }}
        </Formik>      
      </CheckGroup>
    </>
  )
}
  
  