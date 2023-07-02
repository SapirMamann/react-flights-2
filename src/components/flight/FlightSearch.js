import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, setFieldError } from "formik";
import { object, ref, string, date, shape } from "yup";
import { ToastContainer, toast } from 'react-toastify';

import { getAllCountries } from '../../api/country/CountryApi';


export default function FlightSearch() {
  const [departureTime, setDepartureTime] = useState(new Date());

  const [formData, setFormData] = useState({
    origin_country: '',
    destination_country: '',
    departure_time: '',
  });

  const [originCountries, setOriginCountries] = useState([]);
  const [destinationCountries, setDestinationCountries] = useState([]);

  const handleChange = (e) => {
    // console.log(e, "e");
    // console.log(e.target.value, "e name");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,  // e.target.name is the name of the input field, e.target.value is the ID of the selected country
    });

    // with a given origin country, delete that country from the options in destination countries:
    // // Remove the selected origin country from the destination countries
    // if (e.target.name === 'origin_country') {
    //   const newDestinationCountries = destinationCountries.filter(
    //     (country) => country.id !== parseInt(e.target.value)
    //   );
    //   setDestinationCountries(newDestinationCountries);
    // };

    // // Remove the selected destination country from the origin countries
    // if (e.target.name === 'destination_country') {
    //   const newOriginCountries = originCountries.filter(
    //     (country) => country.id !== parseInt(e.target.value)
    //   );
    //   setOriginCountries(newOriginCountries);
    // };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('formData', formData);
  };

  useEffect(() => {
    getAllCountries()
      .then((response) => {
        console.log("FlightSearch useeffect getAllCountries", response);
        setDestinationCountries(response.data);
        setOriginCountries(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);


  return (
    //       <label>From:</label>
    //       {/* Drop down of origin countries: */}
    //       <select name="origin_country" onChange={handleChange}>
    //         {originCountries.map((country) => {
    //             return(
    //               <option value={country.id}>{country.name}</option>
    //             )
    //         })}
    //       </select>
    //       {/* <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} /> */}
    //     </div>

    //     <div name="Destination countries">
    //       <label>To:</label>
    //       {/* Drop down of destination countries: */}
    //       <select name="destination_country" onChange={handleChange}>
    //         {destinationCountries.map((country) => {
    //             return(
    //               <option value={country.id}>{country.name}</option>
    //             )
    //           })}
    //       </select>
    //     </div>

    //     {/* <div name="Departure time">
    //       <label>Departure Time:</label>
    //       <input type="datetime-local" value={formData.departure_time} onChange={handleChange} />
    //     </div> */}

    //     <div name="Departure time">
    //     <label>Departure time</label>
    //       <DatePicker
    //         selected={departureTime}
    //         // onChange={(date) => setDepartureTime(date)}
    //         dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
    //         showTimeinput
    //         timeinputLabel="Time:"
    //         withPortal
    //         name="departure_time"
    //       />
    //     </div>

    //     {/* Submit button: */}
    //     <button type="submit">
    //       <FontAwesomeIcon icon={faSearch} />
    //     </button>
    //   </form>
    // </div>
    <>
       <h1>Search flight</h1>
       <ToastContainer />
       <Formik
        initialValues={{
          origin_country: "",
          destination_country: "",
          departure_time: "2023-04-30T10:50:38Z",
        }}
        onSubmit={(e) => submitHandler(e)}
        // validationSchema={searchFlightValidation}
      >
        {() => {
          return (
            <Form className='input'>
              <div>
                {/* Drop down of origin countries: */}
                <label>From:</label>
                <select name="origin_country" onChange={handleChange}>
                  {originCountries.map((country) => {
                    return(
                      <option value={country.id}>{country.name}</option>
                    )
                  })}
                </select>
                {/* <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} />  */}

                <br/>
                {/* Drop down of destination countries: */}
                <label>To:</label>
                <select name="destination_country" onChange={handleChange}>
                  {destinationCountries.map((country) => {
                      return(
                        <option value={country.id}>{country.name}</option>
                      )
                    })}
                </select>


                <br/>
                {/* <input type="text" name="destination_country" label="Destination country"/> */}
                <label className='label'>Departure time:</label>
                <DatePicker
                  selected={departureTime}
                  onChange={(date) => setDepartureTime(date)}
                  dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
                  showTimeInput
                  timeInputLabel="Time:"
                  withPortal
                  name="departure_time"
                />
                <button type="submit">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
