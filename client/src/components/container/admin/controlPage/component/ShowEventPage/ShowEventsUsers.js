import React, { Component } from 'react'
import { Button } from "antd";

import ViewEvents from '../ViewEvents/ViewEvents'
import ViewUsers from '../ViewUsers/ViewUsers'

import './ShowEventsUsers.css'

class ShowEventPage extends Component {

  state ={
    events:true,
    users:false,
  }
  render() {
    const {events, users} = this.state
    return (
      <div className='container'>
        <div className='btns'>
          <Button type="primary" shape="round" autoFocus onClick={()=>this.setState({events:true, users:false})}> Events </Button>
          <Button type="primary" shape="round" autoFocus onClick={()=>this.setState({events:false, users:true})}> users </Button>
        </div>

      {
        events ? (<ViewEvents />) : (<ViewUsers />)
      }
        
      </div>
    )
  }

}

export default ShowEventPage

