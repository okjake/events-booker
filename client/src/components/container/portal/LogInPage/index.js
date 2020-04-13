import React, { Component } from 'react'
import { Form, Input, Button, Spin, Alert } from 'antd';
import axios from 'axios';

import './style.css'
export class PortalLogin extends Component {
  state = {
    isLoade: false,
    picCode: '',
    serverError: '',
    msg: '',
    error: false
  }
  onFinish = ({ pinCode }) => {
    this.setState({ isLoade: true, })
    axios.post('/api/v1/portal/login', { pinCode }).then(({ data }) => {
      if (data.status === 301) {
        this.props.history.push('/portal/front');
      } else if (data.status === 400) {
        this.setState({
          error: true,
          msg: data.msg,
          pinCode: '',
        })
    } else if (data.status === 401){
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
        <h1>Welcome to GSG Events portal page</h1>
        <Form
          onFinish={this.onFinish}
        >
          <Form.Item
            label="Pin Code"
            name="pinCode"
            rules={[{ message: 'Please input your pin-code!' }]}
          >
            <Input.Password placeholder='Enter your pin code' />
          </Form.Item>
          {isLoade && (<Spin />)}
          <Form.Item >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          {
            error ?
              <Alert
                style={{ width: '75%' }}
                message={msg}
                type="error"
                showIcon />
              : null
          }
        </Form>
      </div>
    );
  }
}

export default PortalLogin
