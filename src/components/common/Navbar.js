import React, { useState, useEffect } from "react";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  Container,
  Nav,
  Navbar,
  Button,
  Form,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";

import ProfileIcon from "./ProfileIcon";
import LoginOptions from "../auth/LoginOptions";
import getCurrentUserData from "../../api/user/UserApi";
import Sidebar from "./Sidebar";
import { isAuthenticated } from "../../api/http";


export default function MyNavbar() {
  const [darkMode, setDarkMode] = useState(true);
  const user = useStoreState((state) => state.user.user);

  const toggleDarkMode = (event) => {
    event.preventDefault();
    setDarkMode(!darkMode);
  };

  const handleDarkModeDoesNotExist = () => {
    localStorage.setItem("darkMode", darkMode);
  };

  // !!! It doesnt effevtively work: !!! i separate it to another useeffect
  useEffect(() => {
    // Retrieve the dark mode state from local storage
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setDarkMode(storedDarkMode);
    } else {
      handleDarkModeDoesNotExist();
    }
    // console.log("navbar- log the username", {username})
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // useEffect(() => {
  //   If access token exist- Fetch the username from the API
  //   if (localStorage.getItem('access')) {
  //     try {
  //       getCurrentUserData()
  //       .then((response) => {
  //         console.log("username", response.username);
  //         setUsername(response.username);
  //         // setIsAdmin(response.isAdmin);
  //       })
  //       .catch((error) => {
  //         console.error("error fetching current user data", error);
  //       })
  //     } catch (error) {
  //       console.debug("Error fetching in MyNavbar", error);
  //     };
  //   }
  // }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Navbar
        bg={darkMode ? "dark" : "light"}
        variant={darkMode ? "dark" : "light"}
        expand=""
        className="mb-3"
      >
        {/* <br /> */}
        {/* <Navbar
        bg={darkMode ? 'dark' : 'light'}
        variant={darkMode ? 'dark' : 'light'}
        expand=''
        className="mb-3"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          borderRadius: '60px', // Increase border-radius for more rounding
        }}
      > */}
        <Container fluid>
          {/* Icon + name: */}
          <Navbar.Brand href="/" className="d-flex align-items-center">
            {/* Dark mode button/ airplane icon */}
            <Button
              variant="link"
              // Icon style:
              style={{
                color: "black",
                textDecoration: "none",
                border: "none",
                background: "none",
              }}
              onClick={toggleDarkMode}
              className="btn-lg"
            >
              <FontAwesomeIcon icon={faPlane} className="me-2" size="xl" />
            </Button>

            {/* Site name */}
            <h1 className="ms-1">s.Flights</h1>
          </Navbar.Brand>
          {/* End of icon+ name */}

          {/* Show login options button when user is unauthenticated,
              Otherwise, show profile icon */}
          <div className="ms-auto d-flex align-items-center">
            {user.length > 0 ? <ProfileIcon /> : <LoginOptions />};
          </div>
          {/* End of login and Profile section */}

          {/* Sidebar container */}
          <Sidebar />
        </Container>
      </Navbar>
    </div>
  );
}
