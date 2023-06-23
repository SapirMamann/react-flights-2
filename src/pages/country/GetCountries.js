import React, {useEffect, useState} from 'react'
import { useStoreActions } from 'easy-peasy';
import { Link, useParams, useNavigate } from "react-router-dom";

import http from '../../api/http'
import FlightSearch from '../../components/flight/FlightSearch';
import { CheckGroup } from '../../api/auth/CheckGroup';
import EditCountry from '../../components/country/EditCountry';
import GetFlightsByCountryId from './GetFlightsByCountry';


function GetCountries() {
  const [countries, setCountries] = useState([])
  const [countryID, setCountryID] = useState('')
  const setIsAdmin = useStoreActions(actions => actions.user.setIsAdmin);

  
  const getCountries = async () => {
    await http
            .get('http://localhost:8000/api/countries/')
            .then(response => {
                setCountries(response.data)
            })
            .catch(error => console.log(error))
  }

  useEffect(() => {
    getCountries()
  }, [])


  return (
    <>      
      {/* flight search box */} 
      <FlightSearch/>
      
      {/* Country boxes */}
      <h1>Explore destinations</h1>

      {/* Each box has a country name, an edit button, and a button */}
      <div>
        {countries.map(country =>
          <div key={country.id}>

            {/* make first letter capitalized */}
            <p>{country.name.charAt(0).toUpperCase() + country.name.slice(1)}</p>
            
            {/* Button to see flights to this country */}
            <Link to={{
              pathname: `/flights/${country.name}`
            }}>
              Flights
            </Link>
            
              {/* {isAdmin && <button>Edit</button>} */}
            {/* Edit button will only be displayed when an admin is logged in */}
            {/* <CheckGroup groups={['Administrator']}> */}
              {/* overlay. passing the country id to the handler of this click */}
              {/* <button onClick={() => toggleOverlay(country.id)} className='pen_button'> */}
                {/* <FontAwesomeIcon icon={faPen} />                 */}
              {/* </button> */}
            {/* </CheckGroup> */}
          </div>
        )}
      </div>

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
      <br/><br/>
      {/* </CheckGroup>; */}
    </>
  )
}

export default GetCountries;