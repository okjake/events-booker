import React, { Component } from 'react'

import TableComponent from '../TableComponent/TableComponent'
import axios from 'axios';

import './ViewUsers.css'

class ViewEvents extends Component {
  state = {
    error: null,
    isLoaded: false,
    users: []
  }
  componentDidMount() {
    axios.get('/api/v1/users').
      then(({ data }) => {
        console.log(data)
        this.setState({
          isLoaded: true,
          users: data,
        });

      }).catch()
  }
  render() {

    const { users } = this.state
    const tableDetails = {
      col1_title: 'First Name',
      col2_title: 'Last Name',
      col3_title: 'Mobile',
      col4_title: 'Email',
      col5_title: 'Location',
      col1_dataIndex: 'first_name',
      col2_dataIndex: 'last_name',
      col3_dataIndex: 'mobile',
      col4_dataIndex: 'email',
      col5_dataIndex: 'location',
      type:'user',
    }
    console.log(tableDetails)
    return (
      <div className='table-content'>
        <TableComponent
          data={users}
          tableDetails = {tableDetails}
        />
      </div>
    )
  }
}

export default ViewEvents
