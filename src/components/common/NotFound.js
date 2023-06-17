import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog } from '@fortawesome/free-solid-svg-icons';


export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#232946',
      backgroundColor: 'white'
    }}>
      {/* Icon: */}
      <FontAwesomeIcon
        icon={faDog}
        style={{
          fontSize: '10rem',
          marginRight: '2rem',
          color: '#1b1d3e'
        }}
      />
      {/* Text: */}
      <div>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          fontWeight: 'bold',
          fontStyle: 'italic',
          color: '#1b1d3e'}}
        >
          Page Not Found
        </h1>
        <p style = {{
          fontSize: '1.5rem',
          margin: '0.5rem 0'
        }}>
          Here's a dog icon
        </p>
        <br/>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            marginTop: '2rem',
            padding: '1rem 2rem',
            backgroundColor: '#1b1d3e',
            color: '#f0f4f8',
            borderRadius: '2rem',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            transition: 'background-color 0.2s ease-in-out',
          }}
        >
          Home page
        </Link>
      </div>
    </div>
  );
};


