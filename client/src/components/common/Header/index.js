import React from 'react';
import './style.css';

const Header = () => (
  <div className="header">
    <div className="header_logo">
      <img
        className="header_logo-img"
        src="/static/media/logo.3912d0ae.svg"
        alt="GSG Logo"
      />
      <div className="header_logo-title">
        Events <span className="header_logo-subtitle">Booker</span>
      </div>
    </div>
    <div>
      <h3 className="header_title">
        Welcome to <span className="header_subTitle">GSG event app</span>
      </h3>
      <h4 className="sub-header">
        See the available events at GSG and book your favorite
      </h4>
    </div>
  </div>
);

export default Header;
