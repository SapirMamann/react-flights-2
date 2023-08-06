import React, { useEffect } from 'react';
import { Formik, Form, setFieldError } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import { object, ref, string, date, shape } from "yup";
import "react-datepicker/dist/react-datepicker.css";
import {default as bsForm} from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { CheckGroup } from '../../api/auth/CheckGroup';
import { addNewCountry } from '../../api/country/CountryApi'
import { useStoreState } from 'easy-peasy';


export default function AddCountry() {  
  const isAdmin = useStoreState((state) => state.user.is_staff)

  const AddCountryValidation = object().shape({
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

  useEffect(() => {
    // check if admin state
  }, [])

  
  return (
    <div>
      <CheckGroup groups={['Administrator']}>
        <ToastContainer/>
        <Formik
          initialValues={{
            name: "country",
          }}
          onSubmit={(e) => submitHandler(e)}
          validationSchema={AddCountryValidation}
          >
          {() => {
            return (
              <Form>
                <h1>Add Country</h1>
                <div>
                  {/* Design input with bootstrap: */}
                  <div name="input">
                    <bsForm.Label htmlFor="inputPassword5">Name</bsForm.Label>
                    <bsForm.Control
                      type="text"
                      name="name"
                      aria-describedby="passwordHelpBlock"
                    />
                    <bsForm.Text id="passwordHelpBlock" muted>
                      Country name must be at least 2 characters long
                    </bsForm.Text>
                  </div>
                  <div name="submit button" className="d-grid gap-2">
                    <Button type="submit" variant="secondary" size="lg">
                      Add
                    </Button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>      
      </CheckGroup>
    </div>
  );
};