import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Table, message, Spin } from 'antd';
import axios from 'axios';

import './ViewEvents.css'

class ViewEvents extends Component {
  state = {
    error: null,
    isLoaded: false,
    events: [],
    errorMessage:null,
  }
  componentDidMount() {
    this.setState({ isLoaded: true })
    axios.get('/api/v1/event').
      then(({ data }) => {
        this.setState({
          isLoaded: false,
          events: data,
        });
      }).catch(() => {
        this.setState({ errorMessage: "Internal server error !!" })
      })
  }

  handleAction = currentEvent => {
    axios.patch("/event", { id : currentEvent })
      .then(({data}) => {
        console.log("done");
        message.error(data.msg, 10);
      })
      .catch(() => {
        console.error("error");
      });
  };

  handelEventButtons = (record) => (
    <div>
      <Link to={`/dashboard/${record.event_code}/users`}>Show </Link>
      <Link type="primary" onClick={() => this.handleAction(record.id)}>
        Delete
        </Link>
    </div>
  )

  columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Event Code',
      dataIndex: 'event_code',
      key: 'event_code',
    },
    {
      title: 'Program',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        this.handelEventButtons(record)
      )
    },
  ];

  render() {
    const { events, isLoaded } = this.state
    return (
      <div className='table-event'>
        <Table columns={this.columns} dataSource={events} />
        {isLoaded && (<Spin />)}
      </div>
    )
  }
}

export default ViewEvents
