import React, { Component } from 'react';
import { Form, Input, Button, Spin, Alert, message } from 'antd';
import axios from 'axios';
import propTypes from 'prop-types';
import './style.css';

export default class PortalLogin extends Component {
  state = {
    isLoade: false,
    isFinish: false,
    msg: '',
    error: false,
  };

  formRef = React.createRef();

  onFinish = async ({ pinCode }) => {
    const {
      props: {
        history: { push },
      },
    } = this;
    this.setState({ isLoade: true, isFinish: true });
    try {
      const { data } = await axios.post('/api/v1/portal/login', { pinCode });
      push('/portal/attendance');
      message.success(data.msg, 10);
    } catch ({
      response: {
        data: { msg },
      },
    }) {
      this.setState({
        error: true,
        msg,
        isLoade: false,
        isFinish: true,
      });
    }
  };

  onReset = () => {
    const {
      formRef: {
        current: { resetFields },
      },
    } = this;
    resetFields();
  };

  render() {
    const { isLoade, error, msg, isFinish } = this.state;
    const { formRef, onReset, onFinish } = this;
    if (isFinish) {
      onReset();
    }
    return (
      <div className="portal-contant">
        <h1 className="title">
          Welcome to <span>GSG Events portal login page</span>
        </h1>
        <Form className="main-form" onFinish={onFinish} ref={formRef}>
          <Form.Item
            className="input-field"
            name="pinCode"
            rules={[{ message: 'Please input your pin-code!' }]}
          >
            <Input.Password placeholder="Enter your pin code" />
          </Form.Item>
          <Form.Item className="btn">
            <Button type="primary" htmlType="submit">
              {isLoade ? <Spin /> : ' Login '}
            </Button>
          </Form.Item>
        </Form>
        {error ? (
          <Alert className="alert" message={msg} type="error" showIcon />
        ) : null}
      </div>
    );
  }
}
propTypes.shape({
  history: propTypes.shape({
    push: propTypes.func.isRequired,
    goBack: propTypes.func.isRequired,
  }).isRequired,
});
