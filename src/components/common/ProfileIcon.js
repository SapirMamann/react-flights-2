import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCardClip } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import { useStoreState } from "easy-peasy";

import Logout from "../auth/Logout";


const ProfileIcon = () => {
  const user = useStoreState((state) => state.user.user);
  const userID = user?.length > 0 && user[0]?.id

  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    // console.log("user id", user[0].id)
    console.log("user id", userID)
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
        <li><a className="dropdown-item" href="/profile">Profile</a></li>
        <li><a className="dropdown-item" href={`/my_tickets`}>My tickets</a></li>
        <li><Logout/></li>
        {/* add: logged in -> he can see log out */}
      </ul>
    </div>
  );
};

export default ProfileIcon;
