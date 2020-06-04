import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, message, Spin, Button, Result } from 'antd';
import axios from 'axios';

import './ViewEvents.css';

class ViewEvents extends Component {
  state = {
    isLoaded: true,
    events: [],
    serverError: null,
  };

  columns = [
    {
      title: 'Event Name',
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
      title: 'Number of users',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => this.handelEventButtons(record),
    },
  ];

  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/v1/event');
      this.setState({
        isLoaded: false,
        events: data,
      });
    } catch (error) {
      let errorMsg;
      if (error.response) {
        errorMsg = error.message;
      } else {
        errorMsg = 'Something went wrong, please try again later';
      }
      this.setState({ serverError: errorMsg, isLoaded: false });
    }
  }

  handleAction = async(currentEvent) => {
    try{
      const {data} = await axios.patch('/api/v1/event', { id: currentEvent })
      const {data: { rows },msg,} = data;
      message.success(msg, 10);
      const { events } = this.state;
      const remainingEvents = events.filter(
        (event) => event.id !== rows[0].id
      );
      this.setState({ events: remainingEvents });
    } catch(err){
      let errorMsg;
      if (err.response) {
        errorMsg ="Internal server error, the event hasn't deleted yet!!";
      } else {
        errorMsg = 'Something went wrong, please try again later';
      }
      message.error(errorMsg)

    }
  };

  handelEventButtons = (record) => {
    const eventCode = record.event_code;
    return (
      <div className="action-btns">
        <Link
          className="show"
          to={{
            pathname: `/dashboard/${eventCode}/users`,
            state: { title: record.title },
          }}
        >
          Show{' '}
        </Link>
        <Button
          className="delete"
          type="danger"
          onClick={() => this.handleAction(record.id)}
        >
          Delete
        </Button>
      </div>
    );
  };

  render() {
    const { events, isLoaded, serverError } = this.state;
    return (
      <div className="table-event">
        {serverError ? (
          <Result
            status="500"
            title="500"
            subTitle="Something went Wrong, please try again later"
          />
        ) : isLoaded ? (
          <Spin size="large" className="loading" />
        ) : (
          <Table rowKey="id" columns={this.columns} dataSource={events} />
        )}
      </div>
    );
  }
}

export default ViewEvents;
