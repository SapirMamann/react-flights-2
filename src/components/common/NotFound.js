import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog } from '@fortawesome/free-solid-svg-icons';


function NotFound() {
  return (
    <div className="not-found-container">
      <FontAwesomeIcon icon={faDog} className="not-found-icon" />
      <div>
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className='not-found-body'>Here's a dog icon</p>
        <p></p>
        <Link to='/' className='not-found-link'>
          Home page
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
