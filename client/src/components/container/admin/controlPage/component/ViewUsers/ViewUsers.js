import React, { Component } from 'react';
import { Table, Spin, Result } from 'antd';

import axios from 'axios';

import './ViewUsers.css';

class ViewEvents extends Component {
  state = {
    isLoaded: true,
    users: [],
    serverError: null,
  };

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

  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/v1/users');
      this.setState({
        isLoaded: false,
        users: data,
      });
    } catch (error) {
      let serverError;

      if (error.response) {
        serverError = error.response.data.error;
      } else {
        serverError = 'Something went wrong, please try again later';
      }

      this.setState({ serverError: error, isLoaded: false });
    }
  }

  render() {
    const { users, isLoaded, serverError } = this.state;
    return (
      <div className="table-users">
        {serverError ? (
          <Result
            status="500"
            title="500"
            subTitle="Something went Wrong, please try again later"
          />
        ) : isLoaded ? (
          <Spin size="large" className="loading" />
        ) : (
          <Table rowKey="mobile" columns={this.columns} dataSource={users} />
        )}
      </div>
    );
  }
}

export default ViewEvents;
