import React from 'react'

export default function AboutPage() {
  return (
    <div>About My Flight Booking System

      Welcome to My Flight Booking System, where travelers can search for and book flights to your desired destinations.
      My platform is designed to provide a user-friendly experience, whether you're an anonymous visitor, a customer looking to book a flight, an airline company managing flights, or an admin overseeing the entire system.

      <h2>
      Features and Functionality
      </h2>

    Anonymous Users: As an anonymous user, you have the privilege to explore the various flight options available without the need to log in. You can browse through flight details, destinations, and departure times to plan your next trip.

      Registered Customers: Customers who have registered and logged in can take advantage of the booking functionality.
      They can search for flights, view remaining tickets amount, and book your desired flights.

      Airline Companies: Airline companies can manage their flights. They can add new flights, update flight details, and remove flights.

      User-Specific Dashboards: Both customers and airline companies have personalized dashboards where they can view the list of flights they've booked or listed.
  

      Administrators: Admin panel is designed to empower administrators with comprehensive control over the system. Admins can add new countries, customers and airlines, see customers information,
      and oversee the activities of airline companies and search through all flights. They can also create additional admin accounts and it automatically assign them to the appropriate permissions.

      <h2>
      Authentication and Security
    </h2>

    The authentication system is based on JWT (JSON Web Tokens). I've implemented a permission system that ensures users have access only to the functionalities and information relevant to their roles.
      <h1>
        Password Management
      </h1>

    Users who wish to change their passwords can do so through a dedicated page.

</div>
  )
}

