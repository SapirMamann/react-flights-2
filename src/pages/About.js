import React from 'react';


export default function AboutPage() {
  return (
    <div>
      <h1>
        About My Flight Booking System
      </h1>

      <p>
        Welcome to My Flight Booking System,
        where travelers can search for and book flights to their desired destinations.
        My platform is designed to provide a user-friendly experience,
        whether you're an anonymous visitor,
        a customer looking to book a flight, an airline company managing flights,
        or an admin overseeing the entire system.
        I used Django REST Framework for the backend, MySQL for the database, and React for the frontend.
        My React frontend implements the required CRUD functionalities for various entities.
        <br />
        <br />
        Permissions and Groups: In Django, I've used django's user and groups.
        Views are decorated with a permission required decorator that checks user permissions
        based on their associated group.
        <br />
        In React, the API calls are made using a custom HTTP fetching prefix,
        providing interaction with the Django API.
        Additionally, I've used 'easy-peasy' state management to perform permission checking
        based on the user's group.
        This ensures that users can access only the functionalities they are authorized to use.

      </p>

      <h4>
        Features and Functionality
      </h4>

      <p>
        Anonymous Users: As an anonymous user, you have the privilege to explore the various
        flight options available without the need to log in.
        You can browse through flight details, destinations, and departure times to plan your next trip.
        <br />
        Registered Customers: Customers who have registered and logged in can take
        advantage of the booking functionality.
        They can search for flights, view remaining tickets amount, and book your desired flights.
        Customers can book as many seats as available on a flight.
        I found that prohibiting this action makes no sense...
        <br />
        Airline Companies: Airline companies can manage their flights.
        They can add new flights, update flight details, and remove flights.
        Flights cannot be created with a negative tickets amount,
        and a flight's destination and origin country cannot be the same.
        Also, flight cannot be created if its landing time is before the take-off.
        <br />
        User-Specific Dashboards:
        Both customers and airline companies have personalized dashboards where they can
        view the list of flights they've booked or listed.
        <br />
        Administrators: Admin panel is designed to empower administrators with
        comprehensive control over the system.
        Admins can add new countries, customers and airlines, see customers information,
        and oversee the activities of airline companies and search through all flights.
        They can also create additional admin accounts and it automatically assign them to the
        appropriate permissions.
        <br />
      </p>

      <h4>
        Authentication and Security
      </h4>

      <p>
        The authentication system is based on JWT (JSON Web Tokens).
        I've implemented a permission system that ensures users have access only to the
        functionalities and information relevant to their roles.
      </p>

      <p>
        Password Management:
        Users who wish to change their passwords can do so through a dedicated page.
      </p>

      <h4>
        Starting the Project
      </h4>

      <p>
        To start the Django backend server, follow these steps:
        <br />
        1. Sign in to computer with the username "user" and the password i provided.
        2. Open PowerShell.
        3. Navigate to the directory: C:\Users\user\Desktop\API-Flight-mng-Project\flightsite
        by typing:
        <h5>
          cd Desktop\API-Flight-mng-Project\flightsite
        </h5>
        4. Type the command: "python manage.py runserver"
      </p>

      <p>
        To start the React frontend, follow these steps:
        <br />
        1. Navigate to the directory: C:\Users\user\Desktop\react flights 2
        by typing:
        <h5>
          cd Desktop\react flights 2
        </h5>
        2. Type the command: "npm start"
      </p>

    </div>
  );
}
