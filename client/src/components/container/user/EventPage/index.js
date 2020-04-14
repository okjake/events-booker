import React, { Component } from 'react'
import { Button ,Alert} from "antd";

import EventPageContent from '../EventPageContent/EventPageContent'
import PopupBtnEventcomp from '../PopupBtnEventcomp/PopupBtnEventcomp'
import Axios from 'axios';

import './style.css'

class EventPage extends Component {
  state={
    image:"",
    title:"",
    otherEventProps:[],
    error:""
  }
  componentDidMount(){
    const { location: { state: {info : { image, ...otherEventProps }} } } = this.props;
    const { location: { state: {info:{title}} } } = this.props;
    const { match: { params: { eventCode } } } = this.props;
    if(this.props.location.state.info){
      this.setState({image,title,otherEventProps})
    }else{
      Axios.get(`/api/v1/event/${eventCode}`)
      .then(({data})=>{
        const {image,title,...otherEventProps}=data
        this.setState({image,title,otherEventProps})
      })
      .catch(error=>{
        this.setState({error})
      })
  }
}

  render() {
    const { history: { goBack, push } } = this.props;
    const { match: { params: { eventCode, eventProg } } } = this.props;
    const {image,title,otherEventProps,error}=this.state
    return (
      <div className='container'>
        {(error)&&(<Alert type="error">cant find event</Alert>)}
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
export default EventPage

