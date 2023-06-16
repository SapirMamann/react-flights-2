import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode';

import http from '../http';


export default function DecodeToken() {
  const [user, setUser] = useState(null);

  //Get the access token from local storage
  const token = localStorage.getItem('access');

  //Decode the access token(using jwt decode library)
  const decodedToken = jwt_decode(token);

  //Getting the user_id from the decoded token
  const {user_id} = decodedToken;

  
  useEffect(() => {
    console.log('user_id', user_id); // prints the user_id of the token
    //Fetching user data with api call passing the user_id
    http
      .get(`http://127.0.0.1:8000/api/users/${user_id}`)
      .then(response => {
        // console.log(response)
        console.log('response.data', response.data)
        setUser(response.data)
      })
      .catch(error => console.log(error))
  }, [token]);

  //api call to check if user is customer

  return (
    <div>
      {user_id}
      {user.last_login}
    </div>
  );
}


