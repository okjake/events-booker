import React from 'react';
import { Link } from 'react-router-dom';

import AttendanceLogout from '../AttendanceLogout';
import './Header.css';

const Header = () => (
  <header>
    <div className="header">
      <div className="header_logo">
        <img
          className="header_logo-img"
          src="https://svgshare.com/i/Jru.svg"
          alt="GSG Logo"
        />
        <div className="header_logo-title">
          Events <span className="header_logo-subtitle">Booker</span>
        </div>
      </div>
      <div className="attendance_header">
        <h3 className="header_title">
          Welcome to
          <span className="header_subTitle"> GSG</span>
        </h3>
        <h2 className="sub-header">
          Please enter your code to approve your attendance
        </h2>
        <h3 className="sub-header">
          You haven&apos;t booked any event yet ?{' '}
          <span>
            <Link to="/" target="_blank">
              Click here please
            </Link>
          </span>
        </h3>
      </div>
      <div className="attendance__logout">
        <AttendanceLogout />
      </div>
    </div>
  </header>
);

export default Header;
