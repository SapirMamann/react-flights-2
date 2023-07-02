import React, {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Form, setFieldError } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

import Input from '../common/Input';
import { useEffect } from 'react';
import { getAllCountries } from '../../api/country/CountryApi';
import { getFlightsByParameters } from '../../api/flight/FlightApi';


export default function FlightSearch() {
  const [originCountries, setOriginCountries] = useState([]);
  const [destinationCountries, setDestinationCountries] = useState([]);
  const [departureTime, setDepartureTime] = useState(new Date());
  
  const [selectedOriginCountry, setSelectedOriginCountry] = useState('');
  const [selectedDestinationCountry, setSelectedDestinationCountry] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const animatedComponents = makeAnimated();

  const submitHandler = (values) => {
    console.log('Origin Country:', values.origin_country);
    console.log('Destination Country:', values.destination_country);
    console.log('Departure Time:', values.departure_time);
    getFlightsByParameters(2)
      .then((response) => {
      console.log("ok", response)
      })
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
  
  //style for countries selector
  const animatedComponentsStyles = {
    control: (provided) => ({
      ...provided,
      border: '1px solid gray',
      borderRadius: '4px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'lightblue' : 'white',
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
        // validationSchema={searchFlightValidation}
        >
        {() => {
          return (
            <Form>
              <div>
                {/* Drop down of origin countries: */}
                <label>From:</label>
                <Select 
                  name="origin_country"
                  options={options}
                  value={selectedOriginCountry}
                  onChange={handleOriginCountryChange}
                  //adding a style to the selector:
                  components={animatedComponents}
                  styles={animatedComponentsStyles}  
                  placeholder="Select origin country"              
                />
                  
                {/* Drop down of destination countries: */}
                <label>To:</label>
                <Select 
                  name="destination_country"
                  options={options}
                  value={selectedDestinationCountry}
                  onChange={handleDestinationCountryChange}
                  //adding a style to the selector:
                  components={animatedComponents}
                  styles={animatedComponentsStyles}   
                  placeholder="Select destination country"             
                />

                {/* <input type="text" name="destination_country" label="Destination country"/> */}
                <label className='label'>Departure time:</label>
                <DatePicker
                  name="departure_time"
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