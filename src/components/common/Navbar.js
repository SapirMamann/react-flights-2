import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button, Form, NavDropdown, Offcanvas } from 'react-bootstrap';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStoreActions, useStoreState } from 'easy-peasy';

import ProfileIcon from './ProfileIcon';
import Register from '../auth/Register';

import GetCurrentUserData from '../../api/user/UserApi';



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

  useEffect(() => {
    // Retrieve the dark mode state from local storage
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      setDarkMode(darkMode);
    };

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
            <Register />
            <ProfileIcon />
          </div>
          {/* End of Profile and Register section */}

          {/* Toggle menu: */}
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="end"
            defaultShow={false} // Set defaultShow to false
          >
            <Offcanvas.Header closeButton>
              {/* Title of the toggle menu: */}
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                Hello, {username}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {/* First link */}
                <Nav.Link href="#action1">Home</Nav.Link>
                {/* Second link */}
                <Nav.Link href="#action2">Link</Nav.Link>
                {/* Third section (dropdown) */}
                <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand`}
                >
                  <NavDropdown.Item href="#action3">
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>

                </NavDropdown>
              </Nav>

              {/* Search section: */}
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              {/* End search section */}

            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
