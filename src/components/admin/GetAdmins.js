import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { ToastContainer, toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useStoreState } from "easy-peasy";

import { getAllAdmins } from "../../api/admin/AdminApi";
import { deleteAdminByID } from "./DeleteAdmin";
import { PermissionDenied } from "../../api/auth/CheckGroup";


export default function GetAdmins() {
  // removed admins useeffects dependency because of infinite loop
  
  const user = useStoreState((state) => state.user.user);
  const isAdmin = user?.length > 0 && user[0]?.is_superuser;

  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);

  const target = useRef(null);

  const getAdminsList = () => {
    getAllAdmins()
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.debug("getAdminsList fetching error", error)
        toast.error("Fetching error", error.message)
      }
      );
  };

  const handleDeleteClick = (id) => {
    deleteAdminByID(id);
  };

  useEffect(() => {
    getAdminsList();
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
          <h1>Admins</h1>
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
              href={`/admins/add`}
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
                  <th>User ID</th>
                  <th>Admin ID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, index) => (
                  <tr key={index}>
                    <td>{admin.first_name}</td>
                    <td>{admin.last_name}</td>
                    <td>{admin.user}</td>
                    <td>
                      <Badge bg="primary" pill>
                        {admin.id}
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
                            onClick={() => handleDeleteClick(admin.id)}
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
