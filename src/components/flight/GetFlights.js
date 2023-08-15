import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useStoreState } from "easy-peasy";

import { getAllFlights } from "../../api/flight/FlightApi";
import { deleteFlightByID } from "./DeleteFlightByID";
import { PermissionDenied } from "../../api/auth/CheckGroup";

export default function GetFlightsPage() {
  //TODO: delete and edit with fontawsome action
  // search component
  // airline can only edit their own flights

  const user = useStoreState((state) => state.user.user);
  const isAdmin = user?.length > 0 && user[0]?.is_staff;
  const isAirlineCompany = user?.length > 0 && user[0]?.groups[0] === 1;

  const [flights, setFlights] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getFlights = () => {
    try {
      getAllFlights()
        .then((response) => {
          console.log(response);
          setFlights(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (id) => {
    console.log("Edit clicked for ID:", id);
    // Navigate to the edit page with the specific ID
    navigate(`edit/${id}`);
  };

  const handleDeleteClick = (id) => {
    // console.log("here", id);
    deleteFlightByID(id);
  };

  useEffect(() => {
    getFlights();
    console.log("flights", flights);
  }, []);

  return (
    <div>
      {isAdmin ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>All Flights</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search"
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              style={{ marginRight: "10px" }} 
            />
            <br />
            <a
              href={`/flights/`}
              style={{ marginLeft: "auto", textAlign: "center" }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </a>
          </div>
          <br />
          <div style={{ width: "80%", maxWidth: "800px" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Airline company</th>
                  <th>Origin country</th>
                  <th>Destination country</th>
                  <th>Depatrure time</th>
                  <th>Landing time</th>
                  <th>Remaining tickets</th>
                  <th>Flight ID</th>
                  <th></th>
                </tr>
              </thead>
              {flights && flights.length > 0 ? (
                <tbody>
                  {flights.map((flight, index) => (
                    <tr key={index}>
                      <td>{flight.airline_company}</td>
                      <td>{flight.origin_country}</td>
                      <td>{flight.destination_country}</td>
                      <td>{flight.departure_time}</td>
                      <td>{flight.landing_time}</td>
                      <td>{flight.remaining_tickets}</td>
                      <td>
                        <Badge bg="primary" pill>
                          {flight.id}
                        </Badge>
                      </td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="link"
                            id={`dropdown-${index}`}
                          >
                            <FontAwesomeIcon icon={faEllipsisV} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => handleEditClick(flight.id)}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleDeleteClick(flight.id)}
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tr>
                  <td colSpan="8">No flights available.</td>
                </tr>
              )}
            </Table>
          </div>
        </div>
      ) : (
        <PermissionDenied />
      )}
    </div>
  );
}

// import React, { useEffect, useState, useRef } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
// import { useStoreActions, useStoreState } from "easy-peasy";
// import Card from "react-bootstrap/Card";
// import CardGroup from "react-bootstrap/CardGroup";
// import { Row, Col } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Overlay from "react-bootstrap/Overlay";
// import { useFloating } from "@floating-ui/react";

// import EditCountry from "./EditCountry";
// import GetFlightsByCountryId from "../flight/GetFlightsByCountry";
// import { getAllCountries } from "../../api/country/CountryApi";
// import DeleteCountry from "./DeleteCountry";

// function Bla() {
//   const [countries, setCountries] = useState([]);
//   const [selectedCountryID, setSelectedCountryID] = useState(null);
//   const user = useStoreState((state) => state.user.user);
//   const isAdmin = user?.length > 0 && user[0]?.is_staff;

//   // const navigate = useNavigate();
//   // const { refs, floatingStyles } = useFloating();

//   const target = useRef(null);
//   const [showOverlay, setShowOverlay] = useState(false);

//   const toggleOverlay = (id) => {
//     setSelectedCountryID(id);
//     setShowOverlay(true);
//   };

//   const getCountriesList = () => {
//     getAllCountries()
//       .then((response) => {
//         setCountries(response.data);
//         // console.log("getCountriesList", response.data);
//       })
//       .catch((error) =>
//         console.debug("getCountriesList fetching error", error)
//       );
//   };

//   useEffect(() => {
//     getCountriesList();
//   }, []);

//   return (
//     <>
//       <h1>Explore destinations</h1>

//       {/* If admin -> display button of add country */}
//       {isAdmin && <Link to="/countries/add">add country</Link>}

//       {/* Each box has a country name, an edit button, and a button */}
//       <CardGroup>
//         <Row>
//           {countries.map((country) => (
//             <Col key={country.id} xs={12} sm={6} md={4}>
//               <Card>
//                 <Card.Body>
//                   <Card.Title name="country name">
//                     {country.name.charAt(0).toUpperCase() +
//                       country.name.slice(1)}
//                   </Card.Title>
//                   <Card.Text>
//                     <Link to={{ pathname: `/flights/${country.name}` }}>
//                       Flights
//                     </Link>

//                     {isAdmin && (
//                       <>
//                         <Button
//                           ref={target}
//                           onClick={() => toggleOverlay(country.id)}
//                         >
//                           <FontAwesomeIcon icon={faPen} />
//                         </Button>

//                         <Overlay
//                           target={target.current}
//                           show={showOverlay && selectedCountryID === country.id} // Show overlay for the specific country
//                           placement="right"
//                         >
//                           {({
//                             arrowProps: _arrowProps,
//                             show: _show,
//                             popper: _popper,
//                             hasDoneInitialMeasure: _hasDoneInitialMeasure,
//                             ...props
//                           }) => (
//                             <div
//                               {...props}
//                               style={{
//                                 backgroundColor: "rgba(245, 245, 245, 0.85)",
//                                 padding: "2px 10px",
//                                 color: "black",
//                                 borderRadius: 3,
//                                 ...props.style,
//                               }}
//                             >
//                               <DeleteCountry id={selectedCountryID} />
//                               <button
//                                 onClick={() => toggleOverlay(null)}
//                                 className="x_button"
//                               >
//                                 <FontAwesomeIcon icon={faXmark} />
//                               </button>
//                               <EditCountry id={selectedCountryID} />
//                             </div>
//                           )}
//                         </Overlay>
//                       </>
//                     )}
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </CardGroup>
//       <br />

//       {/* All flights */}
//       {/* <GetFlights/> */}

//       {/* display list of countries and edit buttons */}
//       {/* <CheckGroup groups={['Administrator']}> */}
//       {/* link to add country */}
//       {/* <Link className='center_link'
//               to={{
//                   pathname: '/add_country'
//               }}
//           >
//           Add country
//           </Link> */}

//       {/* list of countries with a button to edit/ delete each country */}
//       {/* <div className='list-container'>
//               <h1 className='title'>Countries</h1> */}
//       {/* <div className='search-bar'>
//                   <input type='text' placeholder='Search...' value={searchQuery} onChange={handleSearch} />
//               </div> */}
//       {/* <ul className='list'>
//                   {countries.map(country =>
//                   (<li key={country.id}>
//                       <span className='bold'>{country.id}</span>
//                       <span className='bold'>{country.name}</span>
//                       <Link className='center_link'
//                       to={{
//                           pathname: `/countries/${country.id}`,
//                           // state: {user}
//                       }}
//                       key={country.id}
//                       >
//                       Edit/ Delete
//                       </Link>
//                   </li>)
//                   )}
//               </ul>
//           </div> */}
//       {/* </CheckGroup>; */}
//     </>
//   );
// }
