import React from 'react'
import moment from 'moment'
import { FaRegClock } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

 
import './EventPageContent.css'
const EventPageContent = ({ title, details, date, count }) => {
  return (
    <div className='content-container'>
      <h1 className='title'>{title}</h1>
      <p className='hosted'>Hosted by: <span>GSG</span></p>
      <p className='details'>{details}</p>
      <p><FaRegClock /> { moment(date).format('LT')}</p>
      <p><FaRegCalendarAlt /> { moment(date).format('dddd , ll')}</p>
      <p><IoIosPeople /> {count} Guests</p>
    </div>
  )
}

export default EventPageContent
