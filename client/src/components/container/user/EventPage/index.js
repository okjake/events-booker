import React, { Component } from 'react'
import { Button } from "antd";

import EventPageContent from '../EventPageContent/EventPageContent'
import PopupBtnEventcomp from '../PopupBtnEventcomp/PopupBtnEventcomp'

import "antd/dist/antd.css";
import './style.css'

class EventPage extends Component {

  render() {
    const { location: { state: [{ image, ...otherEventProps }] } } = this.props
    const { location: { state: [{ title }] } } = this.props;
    const { history: { goBack } } = this.props;
    const { match: { params: { eventCode, eventProg } } } = this.props;

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
              purpose='BOOK NOW' />

            <PopupBtnEventcomp
              title={`Cancel Registeration at ${title} event`}
              eventCode={eventCode}
              eventProg={eventProg}
              purpose='CANCEL REGISTERATION' />

            <Button type="primary" shape="round" autoFocus onClick={goBack}> BACK </Button>

          </div>

        </div>
      </div>
    )
  }

}

export default EventPage

