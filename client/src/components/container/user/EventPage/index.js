import React, { Component } from 'react'
import { Button } from "antd";

import EventPageContent from '../EventPageContent/EventPageContent'
import PopupBtnEventcomp from '../PopupBtnEventcomp/PopupBtnEventcomp'

import './style.css'

class EventPage extends Component {

  render() {
    const { location: { state: {info : { image, ...otherEventProps }} } } = this.props;
    const { location: { state: {info:{title}} } } = this.props;
    const { history: { goBack, push } } = this.props;
    const { match: { params: { eventCode, eventProg } } } = this.props;

    //get event data if state undefined

    return (
      <div className='container'>
        <img src={image} alt='event page background' className='image' />
        <div className='contant'>
          <EventPageContent {...otherEventProps} />
          <div className='btns'>
            <PopupBtnEventcomp
              title={`Register at ${title} event`}
              eventCode={eventCode}
              eventProg={eventProg}
              push={push}
              purpose='BOOK NOW'
              type='booking'/>

            <PopupBtnEventcomp
              title={`Cancel Registeration at ${title} event`}
              eventCode={eventCode}
              eventProg={eventProg}
              purpose='CANCEL REGISTERATION' 
              type='cancel'/>

            <Button type="primary" shape="round" autoFocus onClick={goBack}> BACK </Button>

          </div>

        </div>
      </div>
    )
  }

}

export default EventPage

