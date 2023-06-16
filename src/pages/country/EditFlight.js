// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Formik, Form, setFieldError } from "formik";
// import { object, ref, string, date, shape } from "yup";
// import { ToastContainer, toast } from 'react-toastify';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import { CheckGroup } from '../../api/auth/CheckGroup';
// import { Input } from '../../Components/Input'
// import Flight from '../../Components/Flight';
// import http from '../../api/auth/api';


// // Function for editing flights 
// export default function EditFlight (props) {
//   const {id} = useParams()
//   const [departureTime, setDepartureTime] = useState(new Date());
//   const [landingTime, setLandingTime] = useState(new Date());
//   const navigate = useNavigate();
  
//   const EditFlightValidation = object().shape({
//     origin_country: string()
//                      .required("Origin country is required")
//                     //  .min(3, "Must be at least 3 characters"),
//   })
  
//   const submitHandler = (event) => {
//     console.log(event)
//     const data = event;

//     // Send a PUT request to the API endpoint with the form data
//     http.put(`http://127.0.0.1:8000/api/flights/${id}/`, data)
//         .then(response => {
//           if (response.status === 200) {
//             toast.success('Flight updated successfully!');
//             console.log (response);

//             // return <Navigate replace to="/" />;
//             navigate("/flights");
//           } 
//     })
//         .catch(error => {
//           console.log('Update error:', error.message)
//           // console.warn(Object.entries(error.response))
//           console.warn(Object.entries(error.response.data))
//           for (const [key, value] of Object.entries(error.response.data)) {       
//             toast(`${key}: ${value[0]}`, {
//               position: "top-right",
//               autoClose: 5000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: "light",
//             });
//           }
//         })
//   }


//   return(    
//     <>
//       <h1 className='title'>Edit Flight #{id}</h1>
//       <ToastContainer />
//       <Formik
//         initialValues={{
//           airline_company: "1",
//           origin_country: "",
//           destination_country: "",
//           departure_time: "2023-04-30T10:50:38Z",
//           landing_time: "2023-05-30T10:50:38Z",
//           remaining_tickets: "",
//         }}
//         onSubmit={(e) => submitHandler(e)}
//         validationSchema={EditFlightValidation}
//       >
//         {() => {
//           return (
//             <Form className='input'>
//               <div>
//                 <Input type="text" name="airline_company" label="Airline company" value={id} readOnly/>
//                 <Input type="text" name="origin_country" label="Origin country"/>
//                 <Input type="text" name="destination_country" label="Destination country"/>
//                 <label className='label'>Departure time</label>
//                 <DatePicker
//                   selected={departureTime}
//                   onChange={(date) => setDepartureTime(date)}
//                   dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
//                   showTimeInput
//                   timeInputLabel="Time:"
//                   withPortal
//                   name="departure_time"
//                 />
//                 <label className='label'>Landing time</label>
//                 <DatePicker
//                   selected={landingTime}
//                   onChange={(date) => setLandingTime(date)}
//                   dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
//                   showTimeInput
//                   timeInputLabel="Time:"
//                   withPortal
//                   name="landing_time"
//                   placeholderText="Select"
//                 />
//                 <Input type="text" name="remaining_tickets" label="Tickets"/>
//                 <div >
//                   <button type="submit">Submit</button>
//                 </div>
//               </div>
//             </Form>
//           );
//         }}
//       </Formik>
//     </>
//   )
// }

