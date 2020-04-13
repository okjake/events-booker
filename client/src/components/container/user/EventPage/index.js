import React, { Component } from 'react'
import { Button } from "antd";

import EventPageContent from '../EventPageContent/EventPageContent'
import PopupBtnEventcomp from '../PopupBtnEventcomp/PopupBtnEventcomp'
import Axios from 'axios';

import './style.css'

class EventPage extends Component {
  state={
    image:"",
    title:"",
    otherEventState:[],
    error:""
  }
  getEventData(eventCode){
    Axios.get(`/api/v1/event/${eventCode}`)
    .then(({data})=>{
      const {image,title,...otherEventState}=data
      this.setState({image,title,otherEventState})
    })
    .catch(error=>{
      this.setState({error})
    })
  }

  render() {
    const { location: { state: {info : { image, ...otherEventProps }} } } = this.props;
    const { location: { state: {info:{title}} } } = this.props;
    const { history: { goBack, push } } = this.props;
    const { match: { params: { eventCode, eventProg } } } = this.props;
    const {otherEventState,error}=this.state

    if(!otherEventProps){
      this.getEventData(eventCode)
    }
    if(error){
      return(<div>error</div>)
    }
    else{
    return (
      <div className='container'>
        <img src={(image)?image:this.state.image} alt='event page background' className='image' />
        <div className='contant'>
          <EventPageContent {...otherEventProps} />
          <div className='btns'>
            <PopupBtnEventcomp
              title={`Register at ${(title)?title:this.state.title} event`}
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

}

export default EventPage

