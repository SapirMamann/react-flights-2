import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import GetUserTickets from "../components/ticket/GetUserTickets";

export default function ProfilePage() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 auto", maxWidth: "800px" }}>
      {/* Left side: Button */}
      <div style={{ borderRight: "1px solid #ccc", paddingRight: "20px" }}>
        <Link to="/edit_customer" style={{ display: "inline-block", textDecoration: "none" }}>
          <Button variant="light" size="sm" style={{ background: "#f8f9fa", color: "#6c757d", border: "1px solid #dee2e6", padding: "5px 20px", borderRadius: "3px" }}>
            Edit profile
          </Button>
        </Link>
      </div>
      
      {/* Right side: Ticket Component */}
      <div>
        <GetUserTickets />
      </div>
    </div>
  );
}
