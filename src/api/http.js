import React from 'react';
import axios from 'axios';


let accessToken = localStorage.getItem('access');

const http = (
  // If the user is logged in, then we will 
  // use the access token to make requests to the Django API.
  // Otherwise, we won't include the Authorization header.
  // If a request takes longer than the specified timeout value, Axios will abort the request and reject the Promise with an error indicating a timeout occurred.
  localStorage.getItem('access') 
  ?
  axios.create({
    timeout: 20000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access')}`,     
    },
  })
  :
  axios.create({
    timeout: 20000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
)



// 1. for testing Django locally
export const DJANGO_API_URL  = 'http://localhost:8000';

// 2. for 'production'



export const isAuthenticated = () => {
  const access = localStorage.getItem('access');
  return access !== null;
};



// An interceptor to refresh the access token if it has expired.
const api = axios.create({
  baseURL: DJANGO_API_URL, 
});
  
api.interceptors.request.use(
  (config) => {
    // Retrieve the access token from localStorage
    const access = localStorage.getItem('access');

    // If access token exists, add it to the Authorization header
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => {
    console.debug("access token has an error.", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Check if the error is due to an expired access token
    if (error.response && error.response.status === 401) {
      const refresh = localStorage.getItem('refresh');

      // If refresh token exists, send a request to refresh the access token
      if (refresh) {
        try {
          const response = await axios.post('/refresh-token/', {
            refresh: refresh,
          });

          // Update the access token in localStorage
          localStorage.setItem('access', response.data.access);

          // Retry the original request with the new access token
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return axios(originalRequest);
        } catch (error) {
          // If the refresh request fails, clear the stored tokens and redirect to login
          console.debug("Refresh token can't update the access token.", error);
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          window.location.href = '/login'; 
        }
      } else {
        // If refresh token is not available, clear the stored tokens and redirect to login
        console.debug("Refresh token is not available.", error);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login'; 
      }
    } 

    return Promise.reject(error);
  }
);

//nati:

// An interceptor to refresh the access token if it has expired.
// Runs before requests are handled by then or catch

// @see https://axios-http.com/docs/interceptors


// http.interceptors.response.use(
//     // 
//     // READ ME BEFORE PROCEEDING, PLEASE
//     // I know you aren't supposed to use `window.location.href` in React,
//     // but you cannot use the useHistory hook in this file because it is
//     // not a React component. Therfore, I am using this method instead.
//     // If you read this, please do let me know if you know any other
//     // way to redirect the user to the login page. Thank you. Good day.
//     //
    
//     response => response,
//     async error => {
//         const originalRequest = error.config;
//         console.debug('Interceptor error:', error.response)

//         // Prevent infinite loops
//         // When using a blacklisted token to refresh the access token
//         if (
//             error.response.data.code === "token_not_valid" 
//             &&
//             error.response.data.detail === "Token is blacklisted"
//             ){
//             console.debug("Refresh token is blacklisted, revoke user tokens");
            
//             localStorage.removeItem('access_token');
//             localStorage.removeItem('refresh_token');

//             window.location.href = '/login';
//         }

//         // Prevent infinite loops
//         if (error.response.status === 401 && originalRequest.url === `${DJANGO_API_URL}/auth/refresh/`) {
//             window.location.href = '/login';
//             return Promise.reject(error);
//         }

//         if (
//             error.response.data.code === "token_not_valid" 
//             &&
//             error.response.status === 401 
//             && 
//             error.response.statusText === "Unauthorized"
//             )
//             {
//                 const refreshToken = localStorage.getItem('refresh_token');

//                 if (refreshToken){
//                     const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

//                     // exp date in token is expressed in seconds, while now() returns milliseconds:
//                     const now = Math.ceil(Date.now() / 1000);
                    
//                     if (tokenParts.exp > now) {
//                         console.debug('Token expiration time', tokenParts.exp);

//                         try {
//                             const response = await http
//                                             .post(`${DJANGO_API_URL}/api/auth/refresh/`, 
//                                             { refresh: refreshToken });

//                             localStorage.setItem('access_token',  response.data.access);
//                             localStorage.setItem('refresh_token', response.data.refresh);

//                             console.debug('Set tokens to localStorage, tokens:', response.data)


//                             http.defaults.headers['Authorization']   = "JWT " +   response.data.access;
//                             originalRequest.headers['Authorization'] = "JWT " + response.data.access;

//                             return await http(originalRequest);
//                         } catch (err) {
//                             console.error(err);
//                         }
//                     }else{
//                         console.debug("Refresh token is expired", tokenParts.exp, now);
//                         window.location.href = '/login';
//                     }
//                 }else{
//                     console.debug("Refresh token not available.");
//                     window.location.href = '/login';
//                 }
//         }
      
     
//       // specific error handling done elsewhere
//       return Promise.reject(error);
//   }
// );


export default http;