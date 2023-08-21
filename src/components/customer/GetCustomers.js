import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { ToastContainer, toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useStoreState } from "easy-peasy";

import { PermissionDenied } from "../../api/auth/CheckGroup";
import { getAllCustomers } from "../../api/customer/CustomerApi";
import { deleteCustomerByID } from "./DeleteCustomer";


export default function GetCustomers() {
  // removed admins useeffects dependency because of infinite loop

  const user = useStoreState((state) => state.user.user);
  const isAdmin = user?.length > 0 && user[0]?.is_superuser;

  const [customers, setCustomers] = useState([]);
  const target = useRef(null);

  const getCustomersList = () => {
    getAllCustomers()
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.debug("getCustomersList fetching error", error);
        toast.error("Fetching error", error.message);
      });
  };

  const handleDeleteClick = (id) => {
    deleteCustomerByID(id);
  };

  useEffect(() => {
    getCustomersList();
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
          <h1>Customers</h1>
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
              href={`/register`}
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
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>User ID</th>
                  <th>Customer ID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.first_name}</td>
                    <td>{customer.last_name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>
                    <td>{customer.user}</td>
                    <td>
                      <Badge bg="primary" pill>
                        {customer.id}
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
                            onClick={() => handleDeleteClick(customer.id)}
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
