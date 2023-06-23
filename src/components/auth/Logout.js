import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import http from '../../api/http';


export default function Logout() {
  const navigate = useNavigate();

  const submitHandler = (event) => {
    const data = {
      refresh: localStorage.getItem('refresh'),
    };

    // Send a POST request to the API endpoint with the form data
    http
        .post('http://127.0.0.1:8000/api/auth/logout/', data)
        .then(response => {
          console.log(response.data)
          console.log('logged out')
          navigate('/');
        })
        .catch(error => {
          console.error(error)
        });

  // Remove tokens from local storage
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  };

  // Check if refresh token exists in local storage
  const refresh = localStorage.getItem('refresh');
  if (!refresh) {
    return <Navigate replace to="/" />; // If refresh token doesn't exist, don't render button
  }
  

  return (
    // <button onClick={() => submitHandler()} >Log out</button>
    <Button onClick={() => submitHandler()} variant="light">Logout</Button>
  )
}


