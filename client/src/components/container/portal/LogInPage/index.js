import React, { Component } from 'react';
import { Form, Input, Button, Spin, Alert, message } from 'antd';
import axios from 'axios';
import propTypes from 'prop-types';
import './style.css';

export default class PortalLogin extends Component {
  state = {
    isLoaded: false,
    msg: '',
    error: false,
  };

  onFinish = async ({ pinCode }, resetFields) => {
    const {
      props: {
        history: { push },
      },
    } = this;
    this.setState({ isLoaded: true });
    try {
      const { data } = await axios.post('/api/v1/portal/login', { pinCode });
      push('/portal/attendance');
      message.success(data.msg, 10);
    } catch (err) {
      let msg;
      resetFields();
      if (err.response) {
        msg = err.response.data.msg;
      } else {
        msg = 'Something went wrong, please try again later';
      }
      this.setState({ msg, error: true, isLoaded: false });
    }
  };

  render() {
    const { isLoaded, error, msg } = this.state;
    const { onFinish } = this;
    const refInput = React.createRef();
    return (
      <div className="portal-contant">
        <h1 className="title">
          Welcome to <span>GSG Events portal login page</span>
        </h1>
        <Form
          className="main-form"
          ref={refInput}
          onFinish={(values) => {
            const {
              current: { resetFields },
            } = refInput;
            onFinish(values, resetFields);
          }}
        >
          <Form.Item
            className="input-field"
            name="pinCode"
            rules={[{ message: 'Please input your pin-code!' }]}
          >
            <Input.Password placeholder="Enter your pin code" />
          </Form.Item>
          <Form.Item className="btn">
            <Button type="primary" htmlType="submit">
              {isLoaded ? <Spin /> : ' Login '}
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
