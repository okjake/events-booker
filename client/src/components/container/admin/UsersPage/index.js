import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import propTypes from 'prop-types';
import UserTable from './TableUser';

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
      location: {
        state: { title },
      },
    } = this.props;
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
        <UserTable
          title={title}
          users={users}
          error={error}
          isLoaded={isLoaded}
        />
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
