import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useStoreActions } from "easy-peasy";
import Button from "react-bootstrap/Button";

// import http from "../../api/http";
import { useStoreState } from "easy-peasy";
import { ApiLogout } from "../../api/auth/AuthApi";
import { PermissionDenied } from "../../api/auth/CheckGroup";

export default function Logout() {
  const navigate = useNavigate();
  const clearUserState = useStoreActions(
    (actions) => actions.user.clearUserState
  );
  const setIsAuthenticated = useStoreActions(
    (actions) => actions.user.setIsAuthenticated
  );
  const isAuthenticated = useStoreState((state) => state.user.isAuthenticated);

  const data = {
    refresh: localStorage.getItem("refresh"),
  };

  const submitHandler = (event) => {
    // Send a POST request to the API endpoint with the form data
    try {
      ApiLogout(data)
        .then((response) => {
          console.log(response.data);
          console.log("logged out");
          setIsAuthenticated(false);
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });

      // Remove tokens from local storage
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      clearUserState();
    } catch {
      console.error("Logout error");
    }
  };

  // Check if refresh token exists in local storage
  // const refresh = localStorage.getItem("refresh");
  // if (!refresh) {
  //   return <Navigate replace to="/" />; // If refresh token doesn't exist, don't render button
  // }

  return (
    <>
      {isAuthenticated ? (
        <Button onClick={() => submitHandler()} variant="light">
          Logout
        </Button>
      ) : (
        <PermissionDenied />
      )}
    </>
  );
}
