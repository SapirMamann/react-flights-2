import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import { getAllCountries } from "../../api/country/CountryApi";

export default function CarouselComponent() {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  const getCountriesList = () => {
    getAllCountries()
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) =>
        console.debug("getCountriesList fetching error", error)
      );
  };

  const handleCountryClick = (countryName) => {
    navigate(`/flights/${countryName}`);
  };

  useEffect(() => {
    getCountriesList();
  }, []);

  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh", // Adjust the height as needed
      }}
    >
      <Carousel
        data-bs-theme="dark"
        style={{ maxWidth: "90%", width: "800px" }}
      >
        {countries.map((country, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block"
              // src={backgroundpic}
              alt={`Slide ${index + 1}`}
              style={{ height: "300px", width: "auto" }}
            />
            <button onClick={() => handleCountryClick(country.name)}>
              {/* <button> */}
              <Carousel.Caption>
                <h5>{country.name}</h5>
                <p>
                  Tap to view flights
                </p>
              </Carousel.Caption>
            </button>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
