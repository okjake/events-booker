import React from 'react'
import moment from 'moment'

import { FaRegClock, FaRegCalendarAlt } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

import './EventPageContent.css'

const EventPageContent = ({ title, details, date, count }) => {
  return (
    <div className='content-container'>
      <h1 className='title'>{title}</h1>
      <p className='hosted'><span>Hosted by:</span> GSG</p>
      <p className='details'>{details}</p>
      <p><span className='icons'><FaRegClock /> </span>{moment(date).format('LT')}</p>
      <p><span className='icons'><FaRegCalendarAlt /> </span>{moment(date).format('dddd , ll')}</p>
      <p><span className='icons'><IoIosPeople size='18' /> </span>{count} Guests</p>
    </div>
  )
}

export default EventPageContent
