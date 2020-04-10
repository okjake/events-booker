import React, { Component } from 'react'

import TableComponent from '../TableComponent/TableComponent'
import axios from 'axios';

import './ViewEvents.css'

class ViewEvents extends Component {
  state = {
    error: null,
    isLoaded: false,
    events: []
  }
  componentDidMount() {
    axios.get('/api/v1/event').
      then(({ data }) => {
        console.log(data)
        this.setState({
          isLoaded: true,
          events: data,
        });

      }).catch()
  }
  render() {

    const { events } = this.state
    const tableDetails = {
      col1_title: 'Title',
      col2_title: 'Event Code',
      col3_title: 'Program',
      col4_title: 'Count',
      col1_dataIndex: 'title',
      col2_dataIndex: 'event_code',
      col3_dataIndex: 'category',
      col4_dataIndex: 'count',
      type:'events'
    }
    return (
      <div className='table-content'>
        <TableComponent
          data={events}
          tableDetails={tableDetails}
        />
      </div>
    )
  }
}

export default ViewEvents
