import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  return (
    <nav className="nav-container">
      <span className="nav-logo" onClick={() => navigate('/')}>
        WeatherDB
        <svg
          style={{
            height: '1.25rem',
            width: '1.25rem',
            marginLeft: '.5rem',
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          ></path>
        </svg>
      </span>
    </nav>
  );
}
