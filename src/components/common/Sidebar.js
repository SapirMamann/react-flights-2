import React from 'react'
import { Nav, Navbar, Button, Form, NavDropdown, Offcanvas } from 'react-bootstrap';


export default function Sidebar(props) {
  const username = props.username

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
        {username &&
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
              Hello, {username}
            </Offcanvas.Title>
          </Offcanvas.Header>
        }

        {/* Body of the toggle menu: */}
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

        <>
          <Button href='/about' variant="info">
            About
          </Button>
        </>
        <br/>
      </Navbar.Offcanvas>  
    </div>
  )
}