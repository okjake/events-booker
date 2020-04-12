import React, { Component } from 'react'
import { Form, Input, Button, Spin } from 'antd';
import axios from 'axios';

import './style.css'
export class PrtalLogin extends Component {
  state = {
    isLoade: false,
    picCode: '',
    serverError:'',
  }
  onFinish = value => {
    this.setState({ isLoade: true })
    
    console.log('Success:', value);
    axios.post('/api/v1/portal/login', { pinCode: value}).then(data => {
      console.log(data)
      this.setState({ isLoade: false })
    }).catch(() => {
      this.setState({ serverError: "Internal server error !!", isLoade: false })
    })
  };
  
  render() {
    const { isLoade } = this.state;
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
            <Input.Password placeholder='Enter your pin code' required/>
          </Form.Item>

          <Form.Item >
            <Button type="primary" htmlType="submit">
              {isLoade && (<Spin />)}
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default PrtalLogin
