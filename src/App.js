import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';

import MyNavbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import EditCountry from './components/country/EditCountry';
import NotFound from './components/common/NotFound';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import GetFlightsByCountryId from './components/flight/GetFlightsByCountry';
import Register from './components/auth/Register';
import { store } from './state';
import AboutPage from './pages/About';
import GetFlightsPage from './components/flight/GetFlights';
import DecodeToken from './api/auth/DecodeToken';
import AddFlight from './components/flight/AddFlight';
import AddCountry from './components/country/AddCountry';
import BookFlight from './components/flight/BookFlight';


export default function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <MyNavbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/de" element={<DecodeToken/>}/>

         <Route path="/countries">
           <Route path="add" element={<AddCountry/>}/>
            {/* <Route index element={<GetFlightsByCountryId/>}/>   
            <Route path=":id" element={<EditCountry/>}/>
            <Route path="edit" element={<EditCountry/>}/> */}
          </Route>
            
          <Route path="/flights"> 
            <Route index element={<GetFlightsPage/>}/>   
            <Route path=":country" element={<GetFlightsByCountryId/>}/>
            <Route path=":flight_id/book" element={<BookFlight/>}/>
            <Route path="add" element={<AddFlight/>}/>
          </Route>

          <Route path="/about" element={<AboutPage/>}/>
          <Route path="*" element={< NotFound/>} /> 
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
};

