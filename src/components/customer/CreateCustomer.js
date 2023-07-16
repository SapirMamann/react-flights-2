import React from 'react';
import { Formik, Form, setFieldError, Field } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import { object, ref, string, date, shape } from "yup";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import {default as bsForm} from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


import { CheckGroup } from '../../api/auth/CheckGroup';
import { addNewCountry } from '../../api/country/CountryApi'


export default function CreateCustomer() {
  const createCustomerValidation = object().shape({
    name: string()
                .required("Name is required")
                .min(2, "Must be at least 2 characters"),
    });
        
  const submitHandler = (event) => {
    // Send a POST request to the API endpoint with the form data
    addNewCountry(event)
      .then(response => {
        console.log("Add country fetching", response.data)
        toast.success('Country added successfully!');
      })
      .catch(error => {
        console.log('creation error:', error.message)
        // console.warn(Object.entries(error.response))
        console.error(Object.entries(error.response.data))
        for (const [key, value] of Object.entries(error.response.data)) {
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
                  <p name="First name">
                    <FloatingLabel controlId="floatingPassword" label="First name">
                    <Field
                      name="first_name"
                      type="text"
                      placeholder="First name"
                      as={bsForm.Control}
                    />
                    </FloatingLabel>
                  </p>
                  <p name="Last name">
                    <FloatingLabel controlId="floatingPassword" label="Last name">
                    <Field
                      name="last_name"
                      type="text"
                      placeholder="Last name"
                      as={bsForm.Control}
                    />
                    </FloatingLabel>
                  </p>
                  <p name="Address">
                    <FloatingLabel controlId="floatingPassword" label="Address">
                    <Field
                      name="address"
                      type="text"
                      placeholder="Address"
                      as={bsForm.Control}
                    />
                    </FloatingLabel>
                  </p>
                  <p name="Phone">
                    <FloatingLabel controlId="floatingPassword" label="Phone">
                    <Field
                      name="phone"
                      type="text"
                      placeholder="Phone"
                      as={bsForm.Control}
                    />
                    </FloatingLabel>
                  </p>
                  <p name="Credit card">
                    <FloatingLabel controlId="floatingPassword" label="Credit card">
                    <Field
                      name="credit_card"
                      type="text"
                      placeholder="Credit card"
                      as={bsForm.Control}
                    />
                    </FloatingLabel>
                  </p>
                  
                  <p name="submit button" className="d-grid gap-2">
                    <Button type="submit" variant="secondary" size="lg">
                      Submit
                    </Button>
                  </p>
                </div>
              </Form>
            );
          }}
        </Formik>      
    </div>
  );
};