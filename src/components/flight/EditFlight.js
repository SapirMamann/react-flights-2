import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, ref, string, date, shape } from "yup";
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {default as bsForm} from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { editFlightByID } from '../../api/flight/FlightApi';
import Select from "react-select";
import { getAllCountries } from '../../api/country/CountryApi';
import makeAnimated from 'react-select/animated';

// import { CheckGroup } from '../../api/auth/CheckGroup';
// import { Input } from '../../Components/Input'
// import Flight from '../../Components/Flight';
// import http from '../../api/auth/api';


// Function for editing flights 
export default function EditFlight (props) {
  const { flight_id } = useParams();
  const [departureTime, setDepartureTime] = useState(new Date());
  const [landingTime, setLandingTime] = useState(new Date());
  const navigate = useNavigate();
  const [allCountries, setAllCountries] = useState([]);

  const animatedComponents = makeAnimated();

  const EditFlightValidation = object().shape({
    origin_country: string()
      .required("Origin country is required"),
    destination_country: string()
      .required("Destination country is required"),
    departure_time: string()
      .required("Departure time is required"),
    landing_time: string()
      .required("Landing time is required"),
    remaining_tickets: string()
      .required("Remaining Tickets field is required"),
  });

  
  const submitHandler = (event) => {
    console.log("event", event)
    console.log(event['departure_time']) //2023-08-30T10:50:38Z
    
    // Send a PUT request to the API endpoint with the form data
    editFlightByID(flight_id, event)
      .then(response => {
        if (response.status === 200) {
          toast.success('Flight updated successfully!');
          console.log(response);
          // return <Navigate replace to="/" />;
          // navigate("/flights");
        };
      })
      .catch(error => {
        // console.log('Update error:', error)
        // console.log('Update error:', error.message)
        // console.log('Update error:', error.response.data)
        // console.warn(Object.entries(error.response.data))
        // console.warn(Object.entries(error.response.data))
        for (const [key, value] of Object.entries(error.response.data)) {
          toast(`${key}: ${value[0]}`, {
            position: "top-right",
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
    
      useEffect(() => {
        getAllCountries ()
        .then((response) => {
          console.log("FlightSearch useeffect getAllCountries", response);
          setAllCountries(response.data);
        })
        .catch((error) => {
          console.log("FlightSearch useeffect getAllCountries error", error);
        });
      }, []);
    
      const options = allCountries.map(country => ({
        value: country.id,
        label: country.name
      }));
    
      // Style for countries selector
      const animatedComponentsStyles = {
        control: (provided) => ({
          ...provided,
          border: '1px solid gray',
          borderRadius: '4px',
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused ? 'lightblue' : 'white',
          color: state.isFocused ? 'white' : 'black',
        }),
      };


  return(    
    <>
      <ToastContainer />
      <Formik
        initialValues={{
          airline_company: "",
          origin_country: "",
          destination_country: "",
          departure_time: "2023-09-30T10:50:38Z",
          landing_time: "2023-09-30T10:50:38Z",
          remaining_tickets: "",
        }}
        onSubmit={(e) => submitHandler(e)}
        validationSchema={EditFlightValidation}
      >
        {() => {
          return (
            <Form name='Edit-flight-form'>
            <h1>Edit Flight #</h1>
            <div>                
              <FloatingLabel controlId="floatingInput" label="Airline company">
                <Field
                  name="airline_company"
                  type="text"
                  placeholder="Airline company"
                  as={bsForm.Control}
                  value={ flight_id } readOnly
                />
                <ErrorMessage name="airline_company" component="div" className="error" />
                </FloatingLabel>

                

                {/* //trying to display it with select: */}

                {/* <label for="origin_country">From:</label>
                <Select 
                  name="origin_country"
                  id="origin_country"
                  options={options}
                  // value={selectedOriginCountry}
                  // onChange={handleOriginCountryChange}
                  //adding a style to the selector:
                  components={animatedComponents}
                  styles={animatedComponentsStyles}  
                  placeholder="Select origin country"              
                />
                <ErrorMessage name="origin_country" component="div" className="error" /> */}




              <FloatingLabel controlId="floatingInput" label="Origin country">
                <Field
                  name="origin_country"
                  type="text"
                  placeholder="Origin country"
                  as={bsForm.Control}
                  // value={id} readOnly
                />
              </FloatingLabel>
                
              <FloatingLabel controlId="floatingInput" label="Destination country">
                <Field
                  name="destination_country"
                  type="text"
                  placeholder="Destination country"
                  as={bsForm.Control}
                  // value={id} readOnly
                />
                <ErrorMessage name="destination_country" component="div" className="error" />
              </FloatingLabel>
                
            <label>Departure time</label>
            <DatePicker
              selected={departureTime}
              onChange={(date) => (setDepartureTime(date), console.log(date))}
              dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
              showTimeInput
              timeInputLabel="Time:"
              withPortal
              name="departure_time"
              placeholderText="Select"
            />
            <label>Landing time</label>
            <DatePicker
              selected={landingTime}
              onChange={(date) => setLandingTime(date)}
              dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
              showTimeInput
              timeInputLabel="Time:"
              withPortal
              name="landing_time"
              placeholderText="Select"
              />
            <FloatingLabel controlId="floatingInput" label="Remaining tickets">
              <Field
                name="remaining_tickets"
                type="text"
                placeholder="Remaining tickets"
                as={bsForm.Control}
                // value={id} readOnly
              />
              <ErrorMessage name="remaining_tickets" component="div" className="error" />
            </FloatingLabel>
              </div>
            <div name="submit button" className="d-grid gap-2">
              <Button type="submit" variant="secondary" size="lg">
                Submit
              </Button>
            </div>
        </Form>
          );
        }}
      </Formik>
    </>
  )
};

