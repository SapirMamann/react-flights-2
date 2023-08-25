import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { number, object, ref, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { default as bsForm } from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "react-toastify/dist/ReactToastify.css";
import { useStoreState } from "easy-peasy";

import { ApiPasswordChange } from "../../api/auth/AuthApi";
import { PermissionDenied } from "../../api/auth/CheckGroup";

export default function PasswordChange() {
  const user = useStoreState((state) => state.user.user);
  const isAuthenticated = useStoreState((state) => state.user.isAuthenticated);

  const PasswordChangeValidation = object().shape({
    old_password: string()
      .required("Your current password is required")
      .min(8, "Must be at least 8 characters"),

    new_password: string()
      .required("A new password is required")
      .min(8, "Must be at least 8 characters"),

    new_password2: string()
      .required("This field is required")
      .min(8, "Must be at least 8 characters")
      .oneOf([ref("new_password")], "Passwords must match"),
  });

  const submitHandler = async (values) => {
    const passwordChangeValues = {
      old_password: values.old_password,
      new_password: values.new_password,
    };
    console.log("passwordChangeValues", passwordChangeValues);
    ApiPasswordChange(passwordChangeValues)
      .then((response) => {
        console.log("response of changing password", response);
        if (response.status === 204) {
          toast.success("Password changed successfully.");
        } else {
          toast.error("Password change failed.");
        }
      })
      .catch((error) => {
        console.log("error in changing password", error);
        for (const [key, value] of Object.entries(error.response.data)) {
          toast.error(`Password change failed. ${key}: ${value[0]}`, {
            // toast.error(`Login failed. ${error.response.data.detail}`, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };

  return (
    <div>
      {isAuthenticated ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ToastContainer />
          <Formik
            initialValues={{
              old_password: "",
              new_password: "",
              new_password2: "",
            }}
            onSubmit={(values) => submitHandler(values)}
            validationSchema={PasswordChangeValidation}
          >
            {() => {
              return (
                <Form style={{ width: "40%" }}>
                  <FloatingLabel
                    controlId="old_password"
                    label="Current password"
                  >
                    <Field
                      name="old_password"
                      type="password"
                      placeholder="Current Password"
                      as={bsForm.Control}
                      autoComplete="current-password"
                    />
                    <ErrorMessage
                      name="old_password"
                      component="div"
                      className="error"
                    />
                  </FloatingLabel>
                  <br />

                  <FloatingLabel controlId="new_password" label="New Password">
                    <Field
                      name="new_password"
                      type="password"
                      placeholder="New Password"
                      as={bsForm.Control}
                    />
                    <ErrorMessage
                      name="new_password"
                      component="div"
                      className="error"
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="new_password2"
                    label="Repeat New Password"
                  >
                    <Field
                      name="new_password2"
                      type="password"
                      placeholder="New Password2"
                      as={bsForm.Control}
                      autoComplete="current-password"
                    />
                    <ErrorMessage
                      name="new_password2"
                      component="div"
                      className="error"
                    />
                  </FloatingLabel>

                  <div className="d-grid gap-2">
                    <Button type="submit" variant="secondary" size="lg">
                      Save
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      ) : (
        <>
          <PermissionDenied />
        </>
      )}
    </div>
  );
}
