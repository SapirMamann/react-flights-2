import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";

import {
  getAllAirlines,
  deleteAirlineCompany,
  updateAirlineCompany,
} from "../../api/airline/AirlineApi";

export default function GetAirlineCompanies() {
  const navigate = useNavigate();
  const [airlineCompanies, setAirlineCompanies] = useState([]);

  const getAirlinesCompanies = () => {
    getAllAirlines()
      .then((response) => {
        console.log("air", response);
        setAirlineCompanies(response);
      })
      .catch((error) => console.debug("airline fetching error", error));
  };

  useEffect(() => {
    getAirlinesCompanies();
  }, []);

  const handleEditClick = (id) => {
    console.log("Edit clicked for ID:", id);
    // Navigate to the edit page with the specific ID
    navigate(`edit/${id}`);
  };

  // const handleEditClick = (id, data) => {
  //   console.log("Button clicked for ID:", id);
  //   try {
  //     updateAirlineCompany(id, data)
  //       .then((response) => {
  //         console.log("api response for deleteAirlineCompany", response);
  //         console.log("api response for deleteAirlineCompany", response.status);
  //         if (response.status === 204) {
  //           toast.success("Airline deleted successful.")
  //         } else {
  //           toast.error("Airline not deleted.")
  //         }
  //       })
  //   } catch (error) {
  //     console.log("Button api error deleteAirlineCompany", error);
  //   }
  // };

  const handleDeleteClick = (id) => {
    console.log("Button clicked for ID:", id);
    try {
      deleteAirlineCompany(id).then((response) => {
        console.log("api response for deleteAirlineCompany", response);
        console.log("api response for deleteAirlineCompany", response.status);
        if (response.status === 204) {
          toast.success("Airline deleted successful.");
        } else {
          toast.error("Airline not deleted.");
        }
      });
    } catch (error) {
      console.log("Button api error deleteAirlineCompany", error);
    }
  };

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

          {airlineCompanies.map((airline, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">{airline.name}</div>
              <div className="ms-4 me-auto">{airline.country}</div>
              <Badge bg="primary" pill>
                {airline.id}
              </Badge>

              <Dropdown>
                <Dropdown.Toggle variant="link" id={`dropdown-${index}`}>
                  <FontAwesomeIcon icon={faEllipsisV} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleEditClick(airline.id)}>
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDeleteClick(airline.id)}>
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
