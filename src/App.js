import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { StoreProvider, useStoreActions, useStoreRehydrated } from "easy-peasy";

import MyNavbar from "./components/common/Navbar";
import HomePage from "./pages/HomePage";
import NotFound from "./components/common/NotFound";
import Login from "./components/auth/Login";
import GetFlightsByCountryId from "./components/flight/GetFlightsByCountry";
import Register from "./components/auth/Register";
import { store } from "./state";
import AboutPage from "./pages/About";
import GetFlightsPage from "./components/flight/GetFlights";
import AddFlight from "./components/flight/AddFlight";
import AddCountry from "./components/country/AddCountry";
import BookFlight from "./components/flight/BookFlight";
import DecodeToken from "./components/auth/DecodeToken";
import GetUserTickets from "./components/ticket/GetUserTickets";
import EditFlight from "./components/flight/EditFlight";
import RegisterAirlineCompany from "./components/auth/RegisterAirlineCompany";
import GetAirlineCompanies from "./components/airline/GetAirlines";
import EditAirline from "./components/airline/EditAirline";
import GetCountries from "./components/country/GetCountries";
import EditCustomer from "./components/customer/EditCustomer";
import AddAdmin from "./components/auth/AddAdmin";
import EditAdmin from "./components/admin/EditAdmin";
import GetCustomers from "./components/customer/GetCustomers";
import GetAdmins from "./components/admin/GetAdmins";
import PasswordChange from "./components/auth/PasswordChange";
import CustomerProfilePage from "./pages/CustomerProfile";
import AirlineProfilePage from "./pages/AirlineProfile";
import AdminProfilePage from "./pages/AdminProfile";

export default function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register_airline_company" element={<RegisterAirlineCompany />}          />
          <Route path="/login" element={<Login />} />
          <Route path="/password/change" element={<PasswordChange />} />
          <Route path="/profile/customer" element={<CustomerProfilePage />} />
          <Route path="/profile/airline" element={<AirlineProfilePage />} />
          <Route path="/profile/admin" element={<AdminProfilePage />} />

          <Route path="/admins">
            <Route index element={<GetAdmins />} />
            <Route path="add" element={<AddAdmin />} />
            <Route path="edit" element={<EditAdmin />} />
          </Route>

          <Route path="/airlines">
            <Route index element={<GetAirlineCompanies />} />
            <Route path="edit/:airline_id" element={<EditAirline />} />
          </Route>

          <Route path="/countries">
            <Route index element={<GetCountries />} />
            <Route path="add" element={<AddCountry />} />
          </Route>

          <Route path="/customers">
            <Route index element={<GetCustomers />} />
            <Route path="edit" element={<EditCustomer />} />
          </Route>

          <Route path="/flights">
            <Route index element={<GetFlightsPage />} />
            <Route path="add" element={<AddFlight />} />
            <Route path=":country" element={<GetFlightsByCountryId />} />
            <Route path=":flight_id/book" element={<BookFlight />} />
            <Route path=":flight_id/edit" element={<EditFlight />} />
            <Route path="by_parameters" element={<EditFlight />} />
          </Route>

          <Route path="/my_tickets" element={<GetUserTickets />} />

          <Route path="/de" element={<DecodeToken />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
