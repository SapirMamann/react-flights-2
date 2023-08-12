import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useStoreActions, useStoreState } from "easy-peasy";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { ToastContainer, toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";

import EditCountry from "./EditCountry";
import GetFlightsByCountryId from "../flight/GetFlightsByCountry";
import { getAllCountries } from "../../api/country/CountryApi";
import DeleteCountry from "./DeleteCountry";

export default function GetCountries() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryID, setSelectedCountryID] = useState(null);
  const user = useStoreState((state) => state.user.user);
  const isAdmin = user?.length > 0 && user[0]?.is_staff;

  // const navigate = useNavigate();
  // const { refs, floatingStyles } = useFloating();

  const target = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = (id) => {
    setSelectedCountryID(id);
    setShowOverlay(true);
  };

  const getCountriesList = () => {
    getAllCountries()
      .then((response) => {
        setCountries(response.data);
        // console.log("getCountriesList", response.data);
      })
      .catch((error) =>
        console.debug("getCountriesList fetching error", error)
      );
  };

  const handleEditClick = (id) => {
    console.log("Edit clicked for ID:", id);
    // Navigate to the edit page with the specific ID
    // navigate(`edit/${id}`);
  };

  const handleDeleteClick = (id) => {
    console.log("Button clicked for ID:", id);
    try {
      // deleteAirlineCompany(id).then((response) => {
      //   console.log("api response for deleteAirlineCompany", response);
      //   console.log("api response for deleteAirlineCompany", response.status);
      //   if (response.status === 204) {
      //     toast.success("Airline deleted successful.");
      //   } else {
      //     toast.error("Airline not deleted.");
      //   }
      // });
    } catch (error) {
      console.log("Button api error deleteAirlineCompany", error);
    }
  };

  useEffect(() => {
    getCountriesList();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Countries</h1>

        {/* If admin -> display button of add country */}
        {isAdmin && <Link to="/countries/add">add country</Link>}

        <div style={{ width: "80%", maxWidth: "800px" }}>
          <ListGroup>
            <ListGroup.Item
              className="d-flex justify-content-between align-items-start"
              style={{ fontWeight: "bold" }}
            >
              <div className="ms-2 me-auto">Airline Name</div>
              <div className="ms-4 me-auto">Airline Country</div>
              <div className="ms-4 me-auto">Airline ID</div>
            </ListGroup.Item>

            {countries.map((country, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  {country.name.charAt(0).toUpperCase() + country.name.slice(1)}
                </div>
                <div className="ms-4 me-auto">
                  <Link to={{ pathname: `/flights/${country.name}` }}>
                    Flights
                  </Link>
                </div>
                <Badge bg="primary" pill>
                  {country.id}
                </Badge>

                <Dropdown>
                  <Dropdown.Toggle variant="link" id={`dropdown-${index}`}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEditClick(country.id)}>
                    Edit
                  </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeleteClick(country.id)}>
                    Delete
                  </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
      <h1>Explore destinations</h1>

      {/* Each box has a country name, an edit button, and a button */}
      <CardGroup>
        <Row>
          {countries.map((country) => (
            <Col key={country.id} xs={12} sm={6} md={4}>
              <Card>
                <Card.Body>
                  <Card.Title name="country name">
                    {country.name.charAt(0).toUpperCase() +
                      country.name.slice(1)}
                  </Card.Title>
                  <Card.Text>
                    <Link to={{ pathname: `/flights/${country.name}` }}>
                      Flights
                    </Link>

                    {isAdmin && (
                      <>
                        <Button
                          ref={target}
                          onClick={() => toggleOverlay(country.id)}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </Button>

                        <Overlay
                          target={target.current}
                          show={showOverlay && selectedCountryID === country.id} // Show overlay for the specific country
                          placement="right"
                        >
                          {({
                            arrowProps: _arrowProps,
                            show: _show,
                            popper: _popper,
                            hasDoneInitialMeasure: _hasDoneInitialMeasure,
                            ...props
                          }) => (
                            <div
                              {...props}
                              style={{
                                backgroundColor: "rgba(245, 245, 245, 0.85)",
                                padding: "2px 10px",
                                color: "black",
                                borderRadius: 3,
                                ...props.style,
                              }}
                            >
                              <DeleteCountry id={selectedCountryID} />
                              <button
                                onClick={() => toggleOverlay(null)}
                                className="x_button"
                              >
                                <FontAwesomeIcon icon={faXmark} />
                              </button>
                              <EditCountry id={selectedCountryID} />
                            </div>
                          )}
                        </Overlay>
                      </>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </CardGroup>
      <br />

      {/* All flights */}
      {/* <GetFlights/> */}

      {/* display list of countries and edit buttons */}
      {/* <CheckGroup groups={['Administrator']}> */}
      {/* link to add country */}
      {/* <Link className='center_link'
              to={{
                  pathname: '/add_country'
              }}
          >
          Add country
          </Link> */}

      {/* list of countries with a button to edit/ delete each country */}
      {/* <div className='list-container'>
              <h1 className='title'>Countries</h1> */}
      {/* <div className='search-bar'>
                  <input type='text' placeholder='Search...' value={searchQuery} onChange={handleSearch} />
              </div> */}
      {/* <ul className='list'>
                  {countries.map(country => 
                  (<li key={country.id}>
                      <span className='bold'>{country.id}</span>
                      <span className='bold'>{country.name}</span>
                      <Link className='center_link'
                      to={{
                          pathname: `/countries/${country.id}`,
                          // state: {user}
                      }}
                      key={country.id}
                      >
                      Edit/ Delete
                      </Link>
                  </li>)
                  )}
              </ul>
          </div> */}
      {/* </CheckGroup>; */}
    </>
  );
}
