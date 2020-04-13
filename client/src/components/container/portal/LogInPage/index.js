import React, { Component } from 'react'
import { Form, Input, Button, Spin, Alert, message } from 'antd';
import axios from 'axios';

import './style.css'
export class PortalLogin extends Component {
  state = {
    isLoade: false,
    picCode: '',
    serverError: '',
    msg: '',
    error: false,
  }

  handleChange = ({target:{value}}) => {
    this.setState({ pinCode: value, error: false });
  };

  onFinish = ({ pinCode }) => {
    axios.post('/api/v1/portal/login', { pinCode}).then(({ data }) => {
      if (data.status === 301) {
        this.props.history.push('/portal/front');
        message.success(data.msg, 10);
      } else if (data.status === 400) {
        this.setState({
          error: true,
          msg: data.msg,
          pinCode: '',
        })
      } else if (data.status === 401) {
        this.setState({
          error: true,
          msg: data.msg,
          pinCode: '',
        })
      }
      this.setState({ isLoade: false })
    }).catch(() => {
      this.setState({ serverError: "Internal server error !!", isLoade: false })
    })
  };

  render() {
    const { isLoade, error, msg } = this.state;
    return (
      <div className='portal-contant'>
        <h1 className='title'>Welcome to <span>GSG Events portal login page</span></h1>
        <Form
          className='main-form'
          onFinish={this.onFinish}
        >
          <Form.Item
            className='input-field'
            name="pinCode"
            rules={[{ message: 'Please input your pin-code!' }]}
          >
            <Input.Password placeholder='Enter your pin code' onChange={this.handleChange}/>
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          {isLoade && (<Spin />)}
        </Form>
        {
          error ?
            <Alert
              
              className='alert'
              message={msg}
              type="error"
              showIcon />
            : null
        }
      </div>
    );
  }
}

export default PortalLogin
