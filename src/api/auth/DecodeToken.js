import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode';

import http from '../http';

// DOES NOOT WORK !!

export default function DecodeToken() {
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  
  const getUserInfo = () => {
    //Get the access token from local storage
    const token = localStorage.getItem('access');
    //Decode the access token(using jwt decode library)
    const decodedToken = jwt_decode(token);
    //Getting the user id from the decoded token
    setUserID(decodedToken);
  }
  
  useEffect(() => {
    try{
      getUserInfo();
      console.log('user_id', userID); // prints the user_id of the token
      //Fetching user data with api call passing the user_id
      http
      .get(`http://127.0.0.1:8000/api/users/${userID}`)
      .then(response => {
        // console.log(response)
        console.log('response.data', response.data)
        setUser(response.data)
      })
      .catch(error => console.log(error))
    } catch (error) {
      console.debug("Error fetching in DecodeToken", error);
    }
  }, []);

  //api call to check if user is customer

  return user ? (
    <div>
      {userID}
      {user.last_login}
    </div>
  ) : (
    <p>No token to decode</p>
  )
};


