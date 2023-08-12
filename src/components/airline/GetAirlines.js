import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

import { getAllAirlines } from "../../api/airline/AirlineApi";

export default function GetAirlineCompanies() {
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
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
