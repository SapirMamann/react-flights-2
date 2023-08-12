import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { object, string } from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useStoreState } from "easy-peasy";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { default as bsForm } from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Input from "../common/Input";
import { updateCountry } from "../../api/country/CountryApi";
import { getAllCountries } from "../../api/country/CountryApi";


export default function EditAirline(props) {
  const user = useStoreState((state) => state.user.user);
  const isAdmin = user?.length > 0 && user[0]?.is_staff;

  //The ID is passed from getCountries..
  const { id } = props;
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");


  const getCountries = () => {
    getAllCountries()
      .then((response) => {
        const countryNames = response.data.map((country) => country.name);
        console.log(response.data);
        setCountries(response.data);
      })
      .catch((error) => console.debug("getCountries fetching error", error));
  };

  useEffect(() => {
    // Fetch countries from the API
    getCountries();
  }, []);

  const EditAirlineValidation = object().shape({
    name: string()
      .required("Name is required")
      .min(3, "Must be at least 3 characters")
      .matches(/^[a-zA-Z]+$/, "Only alphabetical letters are allowed"),
  });

  const submitHandler = (values) => {
    // turn name input to lower cased
    values.name = values.name.toLowerCase();

    // Send a POST request to the API endpoint with the form data
    // updateCountry(id, values)
    //   .then((response) => {
    //     console.log(response.data);
    //     toast.success("Country edited successfully!");
    //   })
    //   .catch((error) => {
    //     console.log("creation error:", error.message);
    //     // console.warn(Object.entries(error.response))
    //     console.error(Object.entries(error.response.data));
    //     for (const [key, value] of Object.entries(error.response.data)) {
    //       toast.error(`Saving failed. ${value[0]}`, {
    //         position: "top-center",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //     }
    //   });
  };

  return (
    <>
      {isAdmin && (
        <div>
          <ToastContainer />
          <Formik
            initialValues={{
              name: "",
              country: "",
            }}
            onSubmit={(e) => submitHandler(e)}
            validationSchema={EditAirlineValidation}
          >
            {() => {
              return (
                <Form className="input">
                  <div>
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
                    </div>

                    <FloatingLabel controlId="country" label="Country">
                      <Field
                        name="country"
                        component={bsForm.Select}
                        as="select"
                        onChange={(e) => {
                          // console.log("selecttttt", e)
                          // console.log("selecttttt", e.target.value)
                          setSelectedCountry(e.target.value);
                        }}
                      >
                        <option>Select a country</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="country"
                        component="div"
                        className="error"
                      />
                    </FloatingLabel>

                    <div name="submit button" className="d-grid gap-2">
                      <Button type="submit" variant="outline-dark">
                        Save
                      </Button>{" "}
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </>
  );
}
