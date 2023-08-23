import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useStoreState } from "easy-peasy";

import {
  getAllFlights,
  getFlightsByAirlineCompany,
} from "../../api/flight/FlightApi";
import { deleteFlightByID } from "./DeleteFlightByID";
import { PermissionDenied } from "../../api/auth/CheckGroup";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function GetFlightsPage() {
  //TODO: delete and edit with fontawsome action
  // search component
  // airline can only edit their own flights

  const user = useStoreState((state) => state.user.user);
  const isAdmin = user?.length > 0 && user[0]?.is_superuser;
  const isAirlineCompany = user?.length > 0 && user[0]?.groups[0] === 1;
  const navigate = useNavigate();

  const [flights, setFlights] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getFlights = () => {
    let fetchFlightsPromise;

    if (isAdmin) {
      // Fetch all flights for admin
      fetchFlightsPromise = getAllFlights();
    } else if (isAirlineCompany) {
      // Fetch flights for the specific airline company
      fetchFlightsPromise = getFlightsByAirlineCompany();
    }

    if (fetchFlightsPromise) {
      fetchFlightsPromise
        .then((response) => {
          setFlights(response);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Fetching error", error.message);
        });
    } else {
      console.log("Nothing to fetch");
    }
  };

  const handleEditClick = (id) => {
    console.log("Edit clicked for ID:", id);
    // Navigate to the edit page with the specific ID
    navigate(`${id}/edit`);
  };

  const handleDeleteClick = (id) => {
    deleteFlightByID(id);
  };

  useEffect(() => {
    getFlights();
  }, []);

  return (
    <div>
      <ToastContainer/>
      {isAdmin || isAirlineCompany ? (
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
              href={`/flights/add`}
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
                      <td>
                        {new Date(flight.departure_time).toLocaleString()}
                      </td>
                      <td>{new Date(flight.landing_time).toLocaleString()}</td>
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
