import React, { Component } from 'react'
import { Button } from "antd";

import EventPageContent from '../EventPageContent/EventPageContent'
import PopupBtnEventcomp from '../PopupBtnEventcomp/PopupBtnEventcomp'

import "antd/dist/antd.css";
import './style.css'

class EventPage extends Component {

  render() {
    console.log(this.props);

    // const { image, ...otherEventProps } = this.props.location.state[0];
    const {location: {state:[{image, ...otherEventProps}]}} = this.props

    // const title = this.props.location.state[0].title;
    const { location: { state: [{ title }] } } = this.props;


    // const goBack = this.props.history.goBack;
    const { history: { goBack } } = this.props;

    // const eventCode = this.props.match.params.eventCode;
    const { match: { params: { eventCode } } } = this.props;
    console.log(eventCode)
    
    return (
      <div className='container'>
        <img src={image} alt='event page background' className='image' />
        <div className='contant'>
          <EventPageContent {...otherEventProps} />
          <PopupBtnEventcomp
            className='btns'
            title={`Register at ${title} event`}
            eventCode={eventCode}
            purpose='BOOK NOW' />

          <PopupBtnEventcomp
            className='btns'
            title={`Cancel Registeration at ${title} event`}
            eventCode={eventCode}
            purpose='Cancel Reqesteration' />

          <Button className='btns' shape="round" autoFocus onClick={goBack}> Back </Button>

        </div>
      </div>
    )
  }

}

export default EventPage

