import React, { useEffect } from 'react';
import { Formik, Form, setFieldError, Field } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import { object, ref, string, date, shape } from "yup";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import {default as bsForm} from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { CheckGroup } from '../../api/auth/CheckGroup';
import { addNewCountry } from '../../api/country/CountryApi'
import { addNewCustomer } from '../../api/customer/CustomerApi';
import DecodeToken from '../auth/DecodeToken';


export default function CreateCustomer() {
  const user = DecodeToken();

  const createCustomerValidation = object().shape({
    first_name: string()
                .required("first name is required")
                .min(2, "Must be at least 2 characters"),
    last_name: string()
                .required("Last name is required")
                .min(2, "Must be at least 2 characters"),
    address: string()
                .required("Address is required")
                .min(2, "Must be at least 2 characters"),
    phone: string()
                .required("Phone is required")
                .min(2, "Must be at least 2 characters"),
    credit_card: string()
                .required("Credit card is required")
                .min(2, "Must be at least 2 characters"),
    });
        
  const submitHandler = (event) => {
    console.log("CreateCustomer", event)
    // eventWithUser = [...event, { user: }]
    
    console.log("CreateCustomer", event)
    // Send a POST request to the API endpoint with the form data
    addNewCustomer(event)
      .then(response => {
        console.log("Add customer fetching", response.data)
        toast.success('Customer added successfully!');
      })
      .catch(error => {
        console.log('creation error:', error.message)
        // console.warn(Object.entries(error.response))
        console.error(Object.entries(error.response))
        for (const [key, value] of Object.entries(error.response)) {
          toast.error(`Saving failed. ${value[0]}`, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        };
      });
  };

  useEffect(() => {
    console.log(user)
  }, []);

  //add if statement to check if user is logged in(has an account)
  //if he doesnt display user creation form as well as the customer creation form.

  return (
    <div>
      {/* <h1>Add Customer</h1> */}
        <ToastContainer/>
        <Formik
          initialValues={{
            user: "",
            first_name: "name",
            last_name: "name",
            address: "",
            phone: "",
            credit_card:"",
          }}
          onSubmit={(e) => submitHandler(e)}
          validationSchema={createCustomerValidation}
          >
          {() => {
            return (
              <Form>
                <div>   
                  <Field
                    type="hidden"
                    value=""
                    name="user"
                  />     
                  <div name="First name">
                    <FloatingLabel controlId="first_name" label="First name">
                    <Field
                      name="first_name"
                      type="text"
                      placeholder="First name"
                      as={bsForm.Control}
                    />
                    </FloatingLabel>
                  </div>
                  <div name="Last name">
                    <FloatingLabel controlId="last_name" label="Last name">
                    <Field
                      name="last_name"
                      type="text"
                      placeholder="Last name"
                      as={bsForm.Control}
                    />
                    </FloatingLabel>
                  </div>
                  <div name="Address">
                    <FloatingLabel controlId="address" label="Address">
                    <Field
                      name="address"
                      type="text"
                      placeholder="Address"
                      as={bsForm.Control}
                    />
                    </FloatingLabel>
                  </div>
                  <div name="Phone">
                    <FloatingLabel controlId="phone" label="Phone">
                    <Field
                      name="phone"
                      type="text"
                      placeholder="Phone"
                      as={bsForm.Control}
                    />
                    </FloatingLabel>
                  </div>
                  <div name="Credit card">
                    <FloatingLabel controlId="credit_card" label="Credit card">
                    <Field
                      name="credit_card"
                      type="text"
                      placeholder="Credit card"
                      as={bsForm.Control}
                    />
                    </FloatingLabel>
                  </div>
                  
                  <div name="submit button" className="d-grid gap-2">
                    <Button type="submit" variant="secondary" size="lg">
                      Submit
                    </Button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>      
    </div>
  );
};