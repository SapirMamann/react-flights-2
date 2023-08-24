import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useStoreState } from "easy-peasy";

import { getAllAirlines } from "../../api/airline/AirlineApi";
import { deleteAirlineByID } from "./DeleteAirlineByID";
import { PermissionDenied } from "../../api/auth/CheckGroup";


export default function GetAirlineCompanies() {
  // country name and not as id
  const user = useStoreState((state) => state.user.user);
  const isAdmin = user?.length > 0 && user[0]?.is_superuser;

  const navigate = useNavigate();
  const [airlineCompanies, setAirlineCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getAirlinesCompanies = () => {
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
            airline.id.toString().includes(searchQuery) ||
            airline.user.toString().includes(searchQuery)
        );
        setAirlineCompanies(filteredAirlines);
      })
      .catch((error) => {
        console.debug("airline fetching error", error);
        toast.error("Fetching error", error.message);
      });
  };

  const handleEditClick = (id) => {
    console.log("Edit clicked for ID:", id);
    // Navigate to the edit page with the specific ID
    navigate(`edit/${id}`);
  };

  const handleDeleteClick = (id) => {
    deleteAirlineByID(id);
  };

  useEffect(() => {
    getAirlinesCompanies();
  }, [searchQuery]);

  return (
    <div>
      <ToastContainer />
      {isAdmin ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>Airline Companies</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <br />
            <a
              href={`/register_airline_company`}
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
                  <th>Airline Name</th>
                  <th>Airline Country</th>
                  <th>User ID</th>
                  <th>Airline ID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {airlineCompanies.map((airline, index) => (
                  <tr key={index}>
                    <td>{airline.name}</td>
                    <td>{airline.country.name}</td>
                    <td>{airline.user}</td>
                    <td>
                      <Badge bg="primary" pill>
                        {airline.id}
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
      ) : (
        <div>
          <PermissionDenied />
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
}
