import React, {useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";
import { Formik, Form, setFieldError } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { object, ref, string, date, shape } from "yup";

import { getAllCountries } from '../../api/country/CountryApi';
import { getFlightsByParameters } from '../../api/flight/FlightApi';


export default function FlightSearch() {
  const [originCountries, setOriginCountries] = useState([]);
  const [destinationCountries, setDestinationCountries] = useState([]);
  const [departureTime, setDepartureTime] = useState(new Date());

  const[desiredFlights, setDesiredFlights] = useState([]);
  
  const [selectedOriginCountry, setSelectedOriginCountry] = useState('');
  const [selectedDestinationCountry, setSelectedDestinationCountry] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const animatedComponents = makeAnimated();

  const navigate = useNavigate();

  const submitHandler = (values) => {
    console.log('Origin Country:', values.origin_country);
    console.log('Destination Country:', values.destination_country);
    console.log('Departure Time:', values.departure_time);
    getFlightsByParameters(2)
      .then((response) => {
        console.log("Response of flight search", response);
      })
      .catch(error => {
        console.log('creation error:', error.message)
        // console.warn(Object.entries(error.response))
        console.error(Object.entries(error.response.data))
        for (const [key, value] of Object.entries(error.response.data)) {
          toast.error(`Searching flights failed. ${value[0]}`, {
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
    getAllCountries()
    .then((response) => {
      console.log("FlightSearch useeffect getAllCountries", response);
      setOriginCountries(response.data);
      console.log("originCountries", response.data);
      setDestinationCountries(response.data);
    })
    .catch((error) => {
      console.log("FlightSearch useeffect getAllCountries error", error);
    });
  }, []);


  const searchFlightValidation = object().shape({
    origin_country: string()
                    .required("Origin country is required"),
                    //  .min(3, "Must be at least 3 characters"),
    destination_country: string()
                        .required("Destination country is required"),
    departure_time: string()
                    .required("Departure time is required"),
  })
      
  // Making the origin countries an array (where each object has a value and label) so the Select can display countries:
  const options = originCountries.map(country => ({
    value: country.id,
    label: country.name
  }));
  
  // Handling the change of the origin country:
  const handleOriginCountryChange = (selectedOption) => {
    console.log("selectedOption", selectedOption);
    setSelectedOriginCountry(selectedOption);
  };

  // Handling the change of the destination country:
  const handleDestinationCountryChange = (selectedOption) => {
    setSelectedDestinationCountry(selectedOption);
  };

  // Handling the change of the time:
  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
  };
  
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


  return (
    <div>
      <ToastContainer/>
      <Formik
        initialValues={{
          origin_country: "",
          destination_country: "",
          departure_time: "",
        }}
        onSubmit={(values) => submitHandler(values)}
        validationSchema={searchFlightValidation}
        >
        {() => {
          return (
            <Form name='Flight-search-form'>
              <div>
                {/* Drop down of origin countries: */}
                <label for="origin_country">From:</label>
                <Select 
                  name="origin_country"
                  id="origin_country"
                  options={options}
                  value={selectedOriginCountry}
                  onChange={handleOriginCountryChange}
                  //adding a style to the selector:
                  components={animatedComponents}
                  styles={animatedComponentsStyles}  
                  placeholder="Select origin country"              
                />
                  
                {/* Drop down of destination countries: */}
                <label for="destination_country">To:</label>
                <Select 
                  name="destination_country"
                  id="destination_country"
                  options={options}
                  value={selectedDestinationCountry}
                  onChange={handleDestinationCountryChange}
                  //adding a style to the selector:
                  components={animatedComponents}
                  styles={animatedComponentsStyles}   
                  placeholder="Select destination country"             
                />

                {/* <input type="text" name="destination_country" label="Destination country"/> */}
                <label for="departure_time">Departure time:</label>
                <DatePicker
                  name="departure_time"
                  id="departure_time"
                  selected={departureTime}
                  onChange={(date) => {
                    handleDateTimeChange(date)
                  }}
                  dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
                  showTimeInput
                  timeInputLabel="Time:"
                  withPortal
                />
                <button type="submit">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>  
    </div>
  );
};