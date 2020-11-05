import React from 'react';

import './style.css';

const Card = ({ image, title, children }) => (
  <li className="card">
    <img className="card__image" src={image} alt={title} />
    {children}
  </li>
);

export default Card;
