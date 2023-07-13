import React, {useEffect, useState, useRef} from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import {useFloating} from '@floating-ui/react';

import http from '../../api/http'
import FlightSearch from '../flight/FlightSearch';
import { CheckGroup } from '../../api/auth/CheckGroup';
import EditCountry from './EditCountry';
import GetFlightsByCountryId from '../flight/GetFlightsByCountry';
import { getAllCountries } from '../../api/country/CountryApi';
import AddCountry from './AddCountry';


export default function GetCountries() {
  const [countries, setCountries] = useState([]);
  const [countryID, setCountryID] = useState('');

  const navigate = useNavigate();
  const {refs, floatingStyles} = useFloating();

  const target = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);

  // const setIsAdmin = useStoreActions(actions => actions.user.setIsAdmin);
  // const isAdmin = useStoreState((state) => state.user.isAdmin);

  const toggleOverlay = (id) => {
    setShowOverlay(!showOverlay);
    setCountryID(id);
    console.log("here",id);  
  };

  const getCountriesList = () => {
    getAllCountries()
      .then(response => {
        setCountries(response.data);
        console.log("getCountriesList", response.data);
      })
      .catch(error => console.debug("getCountriesList fetching error", error));
  };

  useEffect(() => {
    getCountriesList();
  }, []);


  return (
    <>      
      <h1>Explore destinations</h1>
      {/* If admin -> display button of add country */}
      <Link to='/countries/add'>add country</Link>
      
      {/* Each box has a country name, an edit button, and a button */}
      <CardGroup>
        <Row>
          {countries.map(country =>
            <Col key={country.id} xs={12} sm={6} md={4}>
              <Card>
                {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
                <Card.Body>
                  <Card.Title name="country name">
                    {/* make first letter capitalized */}
                    {country.name.charAt(0).toUpperCase() + country.name.slice(1)}
                  </Card.Title>
                  <Card.Text>
                    {/* Button to see flights to this country */}
                    <Link to={{pathname: `/flights/${country.name}`}}>
                      Flights
                    </Link>
                    {/* Edit button will only be displayed when an admin is logged in */}
                    {/* overlay. passing the country id to the handler of this click */}
                    {/* {isAdmin &&  */}
                    {/* <button onClick={() => toggleOverlay(country.id)}>  */}
                    <Button ref={target} onClick={() => toggleOverlay(country.id)}> 
                      <FontAwesomeIcon icon={faPen} />                 
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </CardGroup>
      <br/>
          {/* Overlay details */}
          {/* {showOverlay && (
            <div className="overlay">
              <div className="overlay-content">
                <EditCountry id={countryID} />
                <button className="delete-button">Delete</button>
                <br/>
                <button onClick={toggleOverlay}  className='x_button'>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>
          )} */}

        


      <Overlay target={target.current} show={showOverlay} placement="right">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
            Delete
            <EditCountry id={countryID} />
            
            <button onClick={toggleOverlay}  className='x_button'>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        )}
      </Overlay>

      {/* All flights */}
      {/* <GetFlights/> */}

      {/* display list of countries and edit buttons */}
      {/* <CheckGroup groups={['Administrator']}> */}
          {/* link to add country */}
          {/* <Link className='center_link'
              to={{
                  pathname: '/add_country'
              }}
          >
          Add country
          </Link> */}

          {/* list of countries with a button to edit/ delete each country */}
          {/* <div className='list-container'>
              <h1 className='title'>Countries</h1> */}
              {/* <div className='search-bar'>
                  <input type='text' placeholder='Search...' value={searchQuery} onChange={handleSearch} />
              </div> */}
              {/* <ul className='list'>
                  {countries.map(country => 
                  (<li key={country.id}>
                      <span className='bold'>{country.id}</span>
                      <span className='bold'>{country.name}</span>
                      <Link className='center_link'
                      to={{
                          pathname: `/countries/${country.id}`,
                          // state: {user}
                      }}
                      key={country.id}
                      >
                      Edit/ Delete
                      </Link>
                  </li>)
                  )}
              </ul>
          </div> */}
      {/* </CheckGroup>; */}
    </>
  );
};