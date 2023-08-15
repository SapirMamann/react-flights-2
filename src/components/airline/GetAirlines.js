import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import { getAllAirlines } from "../../api/airline/AirlineApi";
import { deleteAirlineByID } from "./DeleteAirlineByID";

export default function GetAirlineCompanies() {
  //TODO: isadmin permission required
  // country name and not as id

  const navigate = useNavigate();
  const [airlineCompanies, setAirlineCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // const getAirlinesCompanies = () => {
  //   getAllAirlines()
  //     .then((response) => {
  //       console.log("air", response);
  //       setAirlineCompanies(response);
  //     })
  //     .catch((error) => console.debug("airline fetching error", error));
  // };
  const getAirlinesCompanies = () => {
    try {
      getAllAirlines()
        .then((response) => {
          // console.log(searchQuery)
          // console.log(response)
          const filteredAirlines = response.filter(
            (airline) =>
              airline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (airline.country &&
                airline.country
                  .toString()
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())) ||
              airline.id.toString().includes(searchQuery)
          );
          setAirlineCompanies(filteredAirlines);
        })
        .catch((error) => console.debug("airline fetching error", error));
    } catch (error) {
      console.debug("airline fetching error", error);
    }
  };

  const handleEditClick = (id) => {
    console.log("Edit clicked for ID:", id);
    // Navigate to the edit page with the specific ID
    navigate(`edit/${id}`);
  };

  const handleDeleteClick = (id) => {
    console.log("here", id);
    deleteAirlineByID(id);
  };

  useEffect(() => {
    getAirlinesCompanies();
  }, [searchQuery]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Airline Companies</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <br />
      <div style={{ width: "80%", maxWidth: "800px" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Airline Name</th>
              <th>Airline Country</th>
              <th>Airline ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {airlineCompanies.map((airline, index) => (
              <tr key={index}>
                <td>{airline.name}</td>
                <td>{airline.country}</td>
                <td>
                  <Badge bg="primary" pill>
                    {airline.id}
                  </Badge>
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id={`dropdown-${index}`}>
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => handleEditClick(airline.id)}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDeleteClick(airline.id)}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
