import React, { useEffect } from "react";
import {
  Nav,
  Navbar,
  Button,
  Form,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { useStoreState } from "easy-peasy";

export default function Sidebar(props) {
  const user = useStoreState((state) => state.user.user);
  const isAdmin = user?.length > 0 && user[0]?.is_staff;
  const isAirlineCompany = user?.length > 0 && user[0]?.groups[0] === 1;

  return (
    <div>
      {/* Toggle menu: */}
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
      <Navbar.Offcanvas
        id={`offcanvasNavbar-expand`}
        aria-labelledby={`offcanvasNavbarLabel-expand`}
        placement="end"
        defaultShow={false} // Set defaultShow to false
      >
        {/* Header of the toggle menu: */}
        {user.length > 0 && (
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
              Hello, {user[0].username}
            </Offcanvas.Title>
          </Offcanvas.Header>
        )}

        {/* Body of the toggle menu: */}
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3 text-start">
            {/* First link */}
            <Nav.Link href="#action1">Home</Nav.Link>

            {/* Second link */}
            {/* <Nav.Link href="#action2">Link</Nav.Link> */}

            {/* Third section (dropdown) flights for admin and airline company */}
            {/* When admin: */}
            {isAdmin && (
              <>
                <NavDropdown
                  title="Admin"
                  id={`offcanvasNavbarDropdown-expand`}
                >
                  <NavDropdown.Item href="/admins">All admins</NavDropdown.Item>
                  <NavDropdown.Item href="/admins/add">
                    Add admin
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title="Airlines"
                  id={`offcanvasNavbarDropdown-expand`}
                >
                  <NavDropdown.Item href="/airlines">
                    All airlines
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/register_airline_company">
                    Add airline company
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title="Countries"
                  id={`offcanvasNavbarDropdown-expand`}
                >
                  <NavDropdown.Item href="/countries">
                    Countries
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/countries/add">
                    Add country
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title="Customers"
                  id={`offcanvasNavbarDropdown-expand`}
                >
                  <NavDropdown.Item href="/customers">
                    All customers
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/register">
                    Add customer
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title="Flights"
                  id={`offcanvasNavbarDropdown-expand`}
                >
                  <NavDropdown.Item href="/flights">
                    All flights
                  </NavDropdown.Item>
                  
                  <NavDropdown.Divider />
                  {/* <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item> */}
                </NavDropdown>
              </>
            )}
          </Nav>

          {/* When airline: */}
          {isAirlineCompany && (
            <Nav className="justify-content-end flex-grow-1 pe-3 text-start">
              <NavDropdown
                title="Flights"
                id={`offcanvasNavbarDropdown-expand`}
              >
                <NavDropdown.Item href="/flights">All flights</NavDropdown.Item>
                <NavDropdown.Item href="/flights/add">
                  Add flight
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}

          <br />

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

        <>
          <Button href="/about" variant="info">
            About
          </Button>
        </>
        <br />
      </Navbar.Offcanvas>
    </div>
  );
}
