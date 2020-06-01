import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Form, Input, Alert, Spin, message } from 'antd';
import { UserOutlined, HomeOutlined, MailOutlined } from '@ant-design/icons';

import './style.css';

class RegisterUser extends Component {
  state = {
    error: null,
    loading: false,
  };

  onFinish = ({ firstName, lastName, location, email }) => {
    this.setState({ loading: true });
    const {
      match: {
        params: { mobile, eventCode },
      },
      history: { push },
    } = this.props;
    axios
      .post(`/api/v1/register`, {
        firstName,
        lastName,
        location,
        email,
        mobile,
        eventCode,
      })
      .then(({ data }) => {
        this.setState({ loading: false });
        message.success(data.msg);
        push('/');
      })
      .catch(
        ({
          response: {
            data: { msg },
          },
        }) => {
          this.setState({ error: msg, loading: false });
        }
      );
  };

  goBack = () => {
    const {
      history: { goBack },
    } = this.props;
    message.warning('you has not registered yet !!');
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
                placeholder="fisrt name"
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
  mobileNo: PropTypes.string,
  eventCode: PropTypes.number,
};

export default RegisterUser;
