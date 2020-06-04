import React, { Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from 'axios';
import { Button, Empty } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import propTypes from 'prop-types';

import './style.css';

class UsersPage extends Component {
  state = {
    users: [],
    isLoaded: false,
    error: null,
  };

  async componentDidMount() {
    try {
      const {
        match: {
          params: { eventCode },
        },
      } = this.props;
      const { data } = await axios.get(`/api/v1/events/${eventCode}/users`);
      this.setState({
        users: data,
        isLoaded: true,
      });
    } catch (err) {
      let error;
      if (err.response) {
        error = err.response.data.msg;
      } else {
        error = 'Something went wrong, please try again later';
      }
      this.setState({ error, isLoaded: true });
    }
  }

  render() {
    const { error, isLoaded, users } = this.state;
    const {
      match: {
        params: { eventCode },
      },
    } = this.props;
    const title = `users-event-${eventCode}`;

    return (
      <div className="tableSection">
        <header className="headerUsers">
          <div className="content-t">
            <img
              alt="logo"
              src="https://cdn.discordapp.com/attachments/690170174116331638/697432051929972767/GSG_Logo_svg.svg"
            />
            <Button
              type="danger"
              onClick={() => {
                const {
                  history: { goBack },
                } = this.props;
                goBack();
              }}
            >
              Exit
            </Button>
          </div>
        </header>
        <h2>Users for {title} event</h2>
        <div className="content-t">
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename={title}
            sheet="tablexls"
            buttonText="Export to Excel"
          />
          {error ? (
            <div>{error}</div>
          ) : !isLoaded ? (
            <div>
              <LoadingOutlined /> Loading
            </div>
          ) : !users.length ? (
            <Empty description={<span>No users for this event</span>} />
          ) : (
            <table id="table-to-xls" className="table-user">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {users.map(
                  ({
                    first_name,
                    last_name,
                    location,
                    email,
                    mobile,
                    attendance,
                  }) => (
                    <tr key={first_name}>
                      <td>{`${first_name} ${last_name}`} </td>
                      <td>{mobile}</td>
                      <td>{email}</td>
                      <td>{location}</td>
                      <td>{attendance ? 'true' : 'false'}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

UsersPage.propTypes = {
  history: propTypes.shape({
    goBack: propTypes.func.isRequired,
  }).isRequired,
  match: propTypes.shape({
    params: propTypes.shape({
      eventCode: propTypes.string.isRequired,
    }),
  }).isRequired,
};

export default UsersPage;
