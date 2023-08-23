import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { object, ref, string, date, shape } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { default as bsForm } from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useStoreState } from "easy-peasy";

import { PermissionDenied } from "../../api/auth/CheckGroup";
import { addNewCountry } from "../../api/country/CountryApi";

export default function AddCountry() {
  const [isAdmin, setIsAdmin] = useState(false);
  const user = useStoreState((state) => state.user.user);

  const AddCountryValidation = object().shape({
    name: string()
      .required("Name is required")
      .min(2, "Must be at least 2 characters")
      .matches(/^[a-zA-Z]+$/, "Only alphabetical letters are allowed"),
  });

  const submitHandler = (values) => {
    console.log("form values", values);
    // Send a POST request to the API endpoint with the form data
    addNewCountry(values)
      .then((response) => {
        console.log("Add country fetching", response.data);
        toast.success("Country added successfully!");
      })
      .catch((error) => {
        console.log("creation error:", error.message);
        // console.warn(Object.entries(error.response))
        console.error(Object.entries(error.response.data));
        for (const [key, value] of Object.entries(error.response.data)) {
          toast.error(`Saving failed. ${value[0]}`, {
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

  useEffect(() => {
    if (user.length > 0) {
      setIsAdmin(user[0].is_staff);
    }
  }, []);

  return (
    <div>
      {isAdmin ? (
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
              name: "",
            }}
            onSubmit={(formValues) => submitHandler(formValues)}
            validationSchema={AddCountryValidation}
          >
            {() => {
              return (
                <Form style={{ width: "40%" }}>
                  <h1>Add Country</h1>
                  <div>
                    <FloatingLabel controlId="floatingInput" label="Name">
                      <Field
                        name="name"
                        type="text"
                        placeholder="Name"
                        as={bsForm.Control}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error"
                      />
                    </FloatingLabel>

                    <div name="submit button" className="d-grid gap-2">
                      <Button type="submit" variant="secondary" size="lg">
                        Add
                      </Button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      ) : (
        <div>
          {PermissionDenied()}
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
}
