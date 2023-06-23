import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

import Login from './Login';

// change name because its just a login pop up
export default function LoginOptions() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // !!! Todo: when a user is logged in-> remove the login button and only show profile icon
  //       maybe i should make 'authenticated' in store !!!
        // i should navigate to recent page because authenticated user cant access it
        
        // const [isAuthenticated, setIsAuthenticated] = useState(null);
        
        // useEffect(() => {
        //   const loggedInUser = localStorage.getItem("access");
        //   if (loggedInUser) {
        //       setIsAuthenticated(loggedInUser);
        //   }
        // }, []);

  return (
    <>
      {/* Log in button on navbar */}
      <Button style={{color : 'black', background: 'none', border: 'none', fontSize: '25px'}} onClick={handleShow}>
         <FontAwesomeIcon icon={faArrowRightToBracket} /> Log in
      </Button>
      {/* End of log in button on navbar */}

      <Modal show={show} onHide={handleClose}>
        {/* Header of pop up*/}
        <Modal.Header closeButton>
          <Modal.Title>
            Welcome to Your account! <br/>
            Log in and manage your bookings.
          </Modal.Title>
        </Modal.Header>
        {/* End of header */}
        
        {/* Body of pop up- login form */}
        <Modal.Body>  
          {/* <Login/> */}    
          <Button style={{ display: 'flex', justifyContent: 'center', }} variant="outline-primary" href="/login">
            Continue with username
          </Button>    
        </Modal.Body>
        {/* End of body  */}
      </Modal>
    </>
  );
};

