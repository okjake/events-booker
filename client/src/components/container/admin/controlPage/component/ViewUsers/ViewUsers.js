import React, { Component } from 'react'
import { Table,Spin} from 'antd';

import axios from 'axios';

import './ViewUsers.css'

class ViewEvents extends Component {
  state = {
    error: null,
    isLoaded: false,
    users: [],
    errorMessage:null,
  }
  componentDidMount() {
    this.setState({ isLoaded: true })
    axios.get('/api/v1/users').
      then(({ data }) => {
        this.setState({
          isLoaded: false,
          users: data,
        });
      }).catch(() => {
        this.setState({ errorMessage: "Internal server error !!" })
      })
  }

  columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
  ];

  render() {
    const { users, isLoaded } = this.state
        return (
      <div className='table-users'>
        <Table columns={this.columns} dataSource={users} />
        {isLoaded && (<Spin />)}
      </div>
    )
  }
}

export default ViewEvents
