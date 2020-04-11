import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Table, message, Spin, Button } from 'antd';
import axios from 'axios';

import './ViewEvents.css'

class ViewEvents extends Component {
  state = {
    error: null,
    isLoaded: true,
    events: [],
    serverError: null,
  }
  
  componentDidMount() {
    axios.get('/api/v1/event')
    .then(({ data }) => {
      this.setState({
        isLoaded: false,
        events: data,
      });
    }).catch(() => {
      this.setState({ serverError: "Internal server error !!", isLoaded: false })
    })  }

  handleAction = currentEvent => {
    axios.patch("/api/v1/event", { id: currentEvent })
      .then(({ data }) => {
        const {data : { rows }, msg } = data
        message.success(msg, 10);
        const {events} = this.state;
        const remainingEvents = events.filter(event => event.id !== rows[0].id)
        this.setState({events: remainingEvents})
      })
      .catch(() => {
        this.setState({ serverError: "Internal server error !!" })
      })
  };

  handelEventButtons = (record) => (
    <div className='action-btns'>
      <Link className='show' to={`/dashboard/${record.event_code}/users`}>Show </Link>
      <Button className='delete' type="primary" onClick={() => this.handleAction(record.id)}>
        Delete
        </Button>
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
        {isLoaded ? (<Spin size='large' className='loading' />) : <Table rowKey='id' columns={this.columns} dataSource={events} />}
      </div>
    )
  }
}

export default ViewEvents
