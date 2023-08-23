import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useStoreState } from "easy-peasy";

import GetUserTickets from "../components/ticket/GetUserTickets";

export default function ProfilePage() {
  const user = useStoreState((state) => state.user.user);
  const isAdmin = user?.length > 0 && user[0]?.is_superuser;
  const isAirlineCompany = user?.length > 0 && user[0]?.groups[0] === 1;

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 auto", maxWidth: "800px" }}>
      {/* Left side: Button */}
      <div style={{ borderRight: "1px solid #ccc", paddingRight: "20px" }}>
        {isAdmin ? (
          <div>
            <Link to="/admins/edit" style={{ display: "inline-block", textDecoration: "none" }}>
              <Button variant="light" size="sm" style={{ background: "#f8f9fa", color: "#6c757d", border: "1px solid #dee2e6", padding: "5px 20px", borderRadius: "3px" }}>
                Edit profile
              </Button>
            </Link>
          </div>
        ) : isAirlineCompany ? (
          <li><a className="dropdown-item" href="/airline-profile">Airline Profile</a></li>
        ) : (
          <div>
            <Link to="/customers/edit" style={{ display: "inline-block", textDecoration: "none" }}>
              <Button variant="light" size="sm" style={{ background: "#f8f9fa", color: "#6c757d", border: "1px solid #dee2e6", padding: "5px 20px", borderRadius: "3px" }}>
                Edit profile
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      {/* {isAdmin ? (
          // Admin profile
          <li><a className="dropdown-item" href="/profile">Your profile</a></li>
        ) : (
          // Customer profile
          <li><a className="dropdown-item" href="/profile">Your profile</a></li>
        )} */}
      {/* Right side: Ticket Component */}
      <div>
        <GetUserTickets />
      </div>
    </div>
  );
}
