import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCardClip } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
// import Button from 'react-bootstrap/Button';

import Logout from "../auth/Logout";
import { useEffect } from "react";


const ProfileIcon = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {

  }, []);
  

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="profileIconDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={faIdCardClip} />
      </button>

      <ul
        className={`dropdown-menu ${menuOpen ? 'show' : ''}`}
        aria-labelledby="profileIconDropdown"
      >
        <li><a className="dropdown-item" href="/bla">Bla</a></li>
        <li><Logout/></li>
        {/* add: logged in -> he can see log out */}
      </ul>
    </div>
  );
};

export default ProfileIcon;
