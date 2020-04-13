import React, { Component } from 'react'
import { Form, Input, Button, Spin } from 'antd';
import axios from 'axios';

import './style.css'
export class PortalLogin extends Component {
  state = {
    isLoade: false,
    picCode: '',
    serverError:'',
    message:'',
  }

  onFinish = value => {
    console.log(this.props)
    this.setState({ isLoade: true, pinCode:value })
    axios.post('/api/v1/portal/login', { pinCode: value}).then((res) => {
      console.log(res.status)
      if(res.status === 200){
        this.props.history.push('/portal/front');
      }else{
        this.setState({
          error: true,
          message: res.msg,
          pinCode: '',
        })
      }
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

export default PortalLogin
