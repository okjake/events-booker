import React from 'react'

import './EventPageContent.css'
const EventPageContent = ({ title, details, date, count }) => {
  const formateTime = (date) => date.split('T')[0];
  return (
    <div className='content-container'>
      <h1 className='title'>{title}</h1>
      <p className='hosted'>Hosted by: <span>GSG</span></p>
      <p className='details'>{details}</p>
      <p>{formateTime(date)}</p>
      <p>{count} Guests</p>
    </div>
  )
}

export default EventPageContent
