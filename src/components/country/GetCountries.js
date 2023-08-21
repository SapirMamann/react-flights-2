import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import Overlay from "react-bootstrap/Overlay";
import Badge from "react-bootstrap/Badge";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faXmark,
  faEllipsisV,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useStoreState } from "easy-peasy";

import EditCountry from "./EditCountry";
import GetFlightsByCountryId from "../flight/GetFlightsByCountry";
import { getAllCountries } from "../../api/country/CountryApi";
import DeleteCountry from "./DeleteCountry";
import { PermissionDenied } from "../../api/auth/CheckGroup";

export default function GetCountries() {
  // removed admins useeffects dependency because of infinite loop

  const user = useStoreState((state) => state.user.user);
  const isAdmin = user?.length > 0 && user[0]?.is_superuser;

  const [countries, setCountries] = useState([]);
  const [selectedCountryID, setSelectedCountryID] = useState(null);
  const target = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const getCountriesList = () => {
    getAllCountries()
      .then((response) => {
        setCountries(response.data);
        // console.log("getCountriesList", response.data);
      })
      .catch((error) => {
        console.debug("getCountriesList fetching error", error);
        toast.error("Fetching error", error.message);
      });
  };

  const toggleOverlay = (id) => {
    setSelectedCountryID(id);
    setShowOverlay(true);
  };

  useEffect(() => {
    getCountriesList();
  }, []);

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
          <h1>Countries</h1>
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
              href={`/countries/add`}
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
                  <th>Country</th>
                  <th>Country ID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {countries.map((country, index) => (
                  <tr key={index}>
                    <td>
                      {country.name.charAt(0).toUpperCase() +
                        country.name.slice(1)}
                    </td>
                    <td>
                      <Badge bg="primary" pill>
                        {country.id}
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
                            ref={target}
                            onClick={() => {
                              toggleOverlay(country.id);
                            }}
                          >
                            Edit/ Delete
                          </Dropdown.Item>
                          {/* Show overlay for the specific country */}
                          <Overlay
                            show={
                              showOverlay && selectedCountryID === country.id
                            }
                            placement="right"
                            containerPadding={2}
                            target={() =>
                              document.getElementsByClassName("row")[index]
                            } // Target the clicked row
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
                                {/* Delete button */}
                                <DeleteCountry id={selectedCountryID} />
                                {/* x button */}
                                <button
                                  onClick={() => toggleOverlay(null)}
                                  className="x_button"
                                >
                                  <FontAwesomeIcon icon={faXmark} />
                                </button>
                                {/* Edit section */}
                                <EditCountry id={selectedCountryID} />
                              </div>
                            )}
                          </Overlay>
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
