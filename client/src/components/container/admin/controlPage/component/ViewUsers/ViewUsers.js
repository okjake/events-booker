import React, { Component } from 'react'
import { Table,Spin} from 'antd';

import axios from 'axios';

import './ViewUsers.css'

class ViewEvents extends Component {
  state = {
    error: null,
    isLoaded: true,
    users: [],
    errorMessage:null,
  }
  componentDidMount() {
    axios.get('/api/v1/users')
      .then(({ data }) => {
        this.setState({
          isLoaded: false,
          users: data,
        });
      }).catch(() => {
        this.setState({ errorMessage: "Internal server error !!", isLoaded: false })
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
        {isLoaded ? (<Spin size='large' className='loading'/>) : <Table rowKey='mobile' columns={this.columns} dataSource={users} />}
      </div>
    )
  }
}

export default ViewEvents
