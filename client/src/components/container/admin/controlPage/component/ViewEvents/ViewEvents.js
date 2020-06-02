import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, message, Spin, Button, Result } from 'antd';
import axios from 'axios';

import './ViewEvents.css';

class ViewEvents extends Component {
  state = {
    deleteError: null,
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
      const serverError;
      if (error.response) {
        serverError = error.response.data.error;
      } else {
        serverError = 'Something went wrong, please try again later';
      }

      this.setState({ serverError: error, isLoaded: false });
    }
  }

  handleAction = (currentEvent) => {
    axios
      .patch('/api/v1/event', { id: currentEvent })
      .then(({ data }) => {
        const {
          data: { rows },
          msg,
        } = data;
        message.success(msg, 10);
        const { events } = this.state;
        const remainingEvents = events.filter(
          (event) => event.id !== rows[0].id
        );
        this.setState({ events: remainingEvents });
      })
      .catch(() => {
        const error = "Internal server error, the event hasn't deleted yet!!";
        this.setState({ deleteError: error });
        message.error(error);
      });
  };

  handelEventButtons = (record) => {
    const eventcode = record.event_code;
    return (
      <div className="action-btns">
        <Link
          className="show"
          to={{
            pathname: `/dashboard/${eventcode}/users`,
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
