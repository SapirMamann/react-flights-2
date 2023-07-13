import React from 'react';

import GetCountries from '../components/country/GetCountries';
import FlightSearch from '../components/flight/FlightSearch';


export default function HomePage() {
  return (
    <>
        {/* Flight search box */} 
        <FlightSearch/>

        {/* Countries boxes */}
        <GetCountries/>
    </>
  )
};

