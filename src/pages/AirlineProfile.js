import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useStoreState } from "easy-peasy";

import GetFlightsPage from "../components/flight/GetFlights";


export default function AirlineProfilePage() {
  const user = useStoreState((state) => state.user.user);
  const isAdmin = user?.length > 0 && user[0]?.is_superuser;
  const isAirlineCompany = user?.length > 0 && user[0]?.groups[0] === 1;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "column",
        margin: "0 auto",
        maxWidth: "800px",
      }}
    >
      {/* Left side: Button */}
      <div style={{ borderRight: "1px solid #ccc", paddingRight: "20px" }}>
        {isAdmin ? (
          <div>
            <Link
              to="/admins/edit"
              style={{ display: "inline-block", textDecoration: "none" }}
            >
              <Button
                variant="light"
                size="sm"
                style={{
                  background: "#f8f9fa",
                  color: "#6c757d",
                  border: "1px solid #dee2e6",
                  padding: "5px 20px",
                  borderRadius: "3px",
                }}
              >
                Edit profile
              </Button>
            </Link>
          </div>
        ) : isAirlineCompany ? (
          <div>
            <Link
              to="/airline-profile"
              style={{
                display: "inline-block",
                textDecoration: "none",
                marginLeft: "-100px",
                width: "100%",
              }}
            >
              <Button
                variant="light"
                size="sm"
                style={{
                  background: "#f8f9fa",
                  color: "#6c757d",
                  border: "1px solid #dee2e6",
                  padding: "5px 50px",
                  borderRadius: "3px",
                  marginRight: "100px",
                }}
              >
                Edit Profile
              </Button>
            </Link>
            <br />
            <Link
              to="/password/change"
              style={{
                display: "inline-block",
                textDecoration: "none",
                marginLeft: "-100px",
                width: "100%",
              }}
            >
              <Button
                variant="light"
                size="sm"
                style={{
                  background: "#f8f9fa",
                  color: "#6c757d",
                  border: "1px solid #dee2e6",
                  padding: "5px 50px",
                  borderRadius: "3px",
                  marginRight: "100px",
                }}
              >
                Change Password
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <Link
              to="/customers/edit"
              style={{
                display: "inline-block",
                textDecoration: "none",
                marginLeft: "-100px",
                width: "100%",
              }}
            >
              <Button
                variant="light"
                size="sm"
                style={{
                  background: "#f8f9fa",
                  color: "#6c757d",
                  border: "1px solid #dee2e6",
                  padding: "5px 50px",
                  borderRadius: "3px",
                  marginRight: "100px",
                }}
              >
                Edit Profile
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Right side: Ticket Component */}
      <div>
        <GetFlightsPage/>
      </div>
    </div>
  );
}
