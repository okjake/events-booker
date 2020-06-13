import React from 'react';
import moment from 'moment';
import propTypes from 'prop-types';
import { FaRegClock, FaRegCalendarAlt } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';

import './style.css';

const EventPageContent = ({ title, details, date, count }) => (
  <div className="content-container">
    <h1 className="title">{title}</h1>
    <p className="hosted">
      <span>Hosted by:</span> GSG
    </p>
    <p className="details">{details}</p>
    <p>
      <span className="icons">
        <FaRegClock />{' '}
      </span>
      {moment(date).utc().format('LT')}
    </p>
    <p>
      <span className="icons">
        <FaRegCalendarAlt />{' '}
      </span>
      {moment(date).format('dddd , ll')}
    </p>
    <p>
      <span className="icons">
        <IoIosPeople size="18" />{' '}
      </span>
      {count} Guests
    </p>
  </div>
);

EventPageContent.propTypes = {
  title: propTypes.string.isRequired,
  details: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
  count: propTypes.string.isRequired,
};

export default EventPageContent;
