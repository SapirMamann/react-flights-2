import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { number, object, ref, string } from "yup";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { default as bsForm } from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "react-toastify/dist/ReactToastify.css";
import { useStoreState } from "easy-peasy";

import { editUserByID } from "../../api/user/UserApi";
import { UpdateAdmin, getAdminByUserID } from "../../api/admin/AdminApi";


export default function EditAdmin() {
  // Problem is that it changes the password. if i want to update password go to password change url
  // TODO: update user state after changing admin information

  const user = useStoreState((state) => state.user.user);
  const userID = user?.length > 0 && user[0]?.id;
  const [adminID, setAdminID] = useState("");

  useEffect(() => {
    // Getting admin id from api by the username
    getAdminByUserID()
      .then((response) => {
        console.log("get admin by user id response useeffect", response);
        setAdminID(response.data.id)
      })
      .catch((error) => {
        console.log("Error in get admin by user id response useeffect", error);
      });
  }, []);

  const submitHandler = (values) => {
    const userEditValues = {
      username: values.username.toLowerCase(),
      email: values.email,
      password: values.password,
    };

    console.log("values of admin user", values);
    editUserByID(userID, userEditValues)
      .then((response) => {
        if (response.status === 200) {
          const adminEditValues = {
            user: response.data.id,
            first_name: values.first_name.toLowerCase(),
            last_name: values.last_name.toLowerCase(),
          };
          UpdateAdmin(adminID, adminEditValues)
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                toast.success("Admin updated successfully");
              } else
                (error) => {
                  console.log("admin update failed", error);
                };
            })
            .catch((error) => {
              console.log("admin update failed", error);
            });
        }
      })
      .catch((error) => {
        console.log("user of admin update failed", error);
        for (const [key, value] of Object.entries(error.response.data)) {
          toast.error(`Edit failed. ${key}: ${value[0]}`, {
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

  const EditAdminValidation = object().shape({
    username: string()
      .required("A username is required")
      .min(3, "Must be at least 3 characters"),

    email: string()
      .required("An email is required")
      .email("Valid email required"),

    password: string()
      .required("A password is required")
      .min(8, "Must be at least 8 characters"),

    first_name: string()
      .required("First name is required")
      .min(2, "Must be at least 2 characters")
      .matches(/^[a-zA-Z]+$/, "Only alphabetical letters are allowed"),

    last_name: string()
      .required("Last name is required")
      .min(2, "Must be at least 2 characters")
      .matches(/^[a-zA-Z]+$/, "Only alphabetical letters are allowed"),
  });

  return (
    <div>
      <ToastContainer />
      <Formik
        initialValues={{
          username: user[0]?.username || "",
          email: user[0]?.email || "",
          password: "",
          first_name: "",
          last_name: "",
        }}
        onSubmit={(values) => submitHandler(values)}
        validationSchema={EditAdminValidation}
      >
        {() => {
          return (
            <Form>
              <FloatingLabel controlId="username" label="Username">
                <Field
                  name="username"
                  type="text"
                  placeholder="Username"
                  as={bsForm.Control}
                  autoComplete="username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error"
                />
              </FloatingLabel>

              <FloatingLabel controlId="email" label="Email">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  as={bsForm.Control}
                />
                <ErrorMessage name="email" component="div" className="error" />
              </FloatingLabel>

              <FloatingLabel controlId="password" label="Password">
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  as={bsForm.Control}
                  autoComplete="current-password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </FloatingLabel>
              <br />

              <FloatingLabel controlId="first_name" label="First name">
                <Field
                  name="first_name"
                  type="text"
                  placeholder="First name"
                  as={bsForm.Control}
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="error"
                />
              </FloatingLabel>

              <FloatingLabel controlId="last_name" label="Last name">
                <Field
                  name="last_name"
                  type="text"
                  placeholder="Last name"
                  as={bsForm.Control}
                />
                <ErrorMessage
                  name="last_name"
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
  );
}
