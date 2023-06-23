import React, { useState, useEffect } from 'react';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Container, Nav, Navbar, Button, Form, NavDropdown, Offcanvas } from 'react-bootstrap';

import ProfileIcon from './ProfileIcon';
import LoginOptions from '../auth/LoginOptions';
import GetCurrentUserData from '../../api/user/UserApi';
import Sidebar from './Sidebar';


export default function MyNavbar() {
  const [darkMode, setDarkMode] = useState(true);
  const setUsername = useStoreActions((actions) => actions.user.setUsername);
  const username = useStoreState((state) => state.user.username);

  const toggleDarkMode = (event) => {
    event.preventDefault();
    setDarkMode(!darkMode);
  };
  
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // !!! It doesnt effevtively work: !!! i separate it to another useeffect
  useEffect(() => {
    // Retrieve the dark mode state from local storage
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      setDarkMode(darkMode);
    };
  }, []);

  useEffect(() => {
    // Fetch the username from the API
    GetCurrentUserData()
      .then((response) => {
        console.log("username", response.username);
        setUsername(response.username);
      })
      .catch((error) => {
        console.error("error fetching current user data", error);
      })
  }, []);

  return (
    <>
      <Navbar
        bg={darkMode ? 'dark' : 'light'}
        variant={darkMode ? 'dark' : 'light'}
        expand=''
        className="mb-3"
      >
        <Container fluid>
          {/* Icon + name: */}
          <Navbar.Brand href="/" className="d-flex align-items-center">
            {/* Dark mode button/ airplane icon */}
            <Button
              variant="link"
              // Icon style:
              style={{
                color: 'black',
                textDecoration: 'none',
                border: 'none',
                background: 'none',
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
          
          {/* Profile and Register section */}
          <div className='ms-auto d-flex align-items-center'>
              <LoginOptions />
              {username && <ProfileIcon />}
          </div>
          {/* End of Profile and Register section */}
          
          {/* Sidebar container */}
          <Sidebar username={username}/>
        </Container>
      </Navbar>
    </>
  );
};
