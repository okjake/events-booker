import React, { Component } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import { Button, Form, Input, Alert, Spin, message } from 'antd';
import { UserOutlined, HomeOutlined, MailOutlined } from '@ant-design/icons';

import './style.css';

class RegisterUser extends Component {
  state = {
    error: null,
    loading: false,
  };

  onFinish = async ({ firstName, lastName, location, email }) => {
    try {
      const {
        match: {
          params: { mobile, eventCode },
        },
        history,
      } = this.props;
      this.setState({ loading: true });
      await axios.post(`/api/v1/register`, {
        firstName,
        lastName,
        location,
        email,
        mobile,
        eventCode,
      });
      const { data } = await axios.post('/api/v1/checkUser', {
        mobile,
        eventCode,
      });
      message.success(data.msg, 5);
      this.setState({ loading: false }, () => history.push('/'));
    } catch (err) {
      let error;
      if (err.response) {
        error = err.response.data.msg;
      } else {
        error = 'Something went wrong, please try again later';
      }
      this.setState({ error, loading: false });
    }
  };

  goBack = () => {
    const {
      history: { goBack },
    } = this.props;
    message.warning("you haven't not registered yet!");
    goBack();
  };

  render() {
    const { error, loading } = this.state;
    return (
      <div className="main-register">
        <div className="s1">
          <img
            alt="logo"
            src="https://www.wegrowwithc3.com/soon/wp-content/uploads/2015/08/hhfsyd25_400x400.png"
          />
          <h1>
            <span className="blue">welcome to</span> GSG event app
          </h1>
          <h2>
            Register your data to show the available events and choose your
            favorite
          </h2>
          <Form onFinish={this.onFinish}>
            <Form.Item
              name="firstName"
              className="messageColor"
              rules={[
                { required: true, message: 'Please input your firstName!' },
              ]}
            >
              <Input
                placeholder="first name"
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item
              name="lastName"
              className="messageColor"
              rules={[
                { required: true, message: 'Please input your lastName!' },
              ]}
            >
              <Input
                placeholder="last name"
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item
              name="email"
              className="messageColor"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder="email" prefix={<MailOutlined />} />
            </Form.Item>

            <Form.Item
              name="location"
              className="messageColor"
              rules={[
                { required: true, message: 'Please input your location!' },
              ]}
            >
              <Input placeholder="location" prefix={<HomeOutlined />} />
            </Form.Item>

            <Button htmlType="submit" type="primary">
              {' '}
              {loading ? <Spin size="small" /> : 'Submit'}{' '}
            </Button>

            <Button type="danger" onClick={this.goBack}>
              {' '}
              Exit{' '}
            </Button>

            {error && <Alert message={error} type="error" />}
          </Form>
        </div>
        <div className="s2">
          <img
            alt="img"
            src="https://www.thebalancesmb.com/thmb/E6hp3YFsPw8mCK_39bw94CxE4Vk=/3456x3456/smart/filters:no_upscale()/asian-businesswoman-leading-meeting-at-boardroom-table-504987926-5ad21419c5542e0036d7003e.jpg"
          />
        </div>
      </div>
    );
  }
}

RegisterUser.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
    goBack: propTypes.func.isRequired,
  }).isRequired,
  match: propTypes.shape({
    params: propTypes.shape({
      mobile: propTypes.string.isRequired,
      eventCode: propTypes.string.isRequired,
    }),
  }).isRequired,
};

export default RegisterUser;
