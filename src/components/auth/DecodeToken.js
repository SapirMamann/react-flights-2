import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

import { getUserByID } from '../../api/user/UserApi';


export default function DecodeToken() {
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  
  const getUserInfo = () => {
    // Get the access token from local storage
    const token = localStorage.getItem('access');
    if (token) {
      try {
        // Decode the access token (using jwt decode library)
        const decodedToken = jwt_decode(token);
        console.log("decodedToken", decodedToken)
        // Getting the user id from the decoded token
        setUserID(decodedToken.user_id);
      } catch (error) {
        console.debug('Error decoding token:', error);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  
  useEffect(() => {
    console.log('user_id', userID); // prints the user_id of the token
    //Fetching user data with api call passing the user_id      
    if (userID) {
      getUserByID(userID)
        .then((response) => {
          console.log('DecodeToken fetching', response.data);
          setUser(response.data);
        })
        .catch(error => console.debug("Error fetching user in decode token", error));
    };
  }, [userID]);

  //api call to check if user is customer

  // Check if the user is an admin
  const isAdmin = user && user.is_staff;


  return isAdmin || "user not found";
};


