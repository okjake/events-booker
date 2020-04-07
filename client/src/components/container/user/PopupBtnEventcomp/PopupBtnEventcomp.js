import React, { Component } from 'react'
import { Modal, Button, Input } from "antd";
import axios from 'axios';
// import {Redirect } from 'react-router-dom';

import { Alert } from 'antd';

import './PopupBtnEventcomp.css'

class PopupBtnEventcomp extends Component {
  state = {
    visible: false,
    mobile: '',
    eventCode: this.props.eventCode,
    eventProg: this.props.eventProg,
    message: '',
    error: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    const { mobile, eventCode, eventProg } = this.state;
    axios.post('/api/v1/checkUser', { mobile, eventCode })
      .then(({ data }) => {
        console.log(data);
        if (data.status === 301) {
          // <Redirect to={`/register/${eventProg}/${eventCode}/${mobile}`}/>;
        } else if (data.status === 400) {
          this.setState({
            error: true,
            message: data.msg,
            mobile: '',
          })
        }
        if (!mobile) {
          setTimeout(() => {
            this.setState({ error: false });
          }, 2000);
        }
      })
      .catch()
    this.setState({
      // visible: false,
      mobile: '',
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handleChange = e => {
    this.setState({ mobile: e.target.value });
  };

  render() {
    const { visible, mobile, message, error } = this.state
    return (
      <div className='popup-modal'>
        <Button type="primary" onClick={this.showModal} shape="round" autoFocus>
          {this.props.purpose}
        </Button>
        <Modal
          title={this.props.title}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <Input
            placeholder="Enter Your Mobile Number"
            value={mobile}
            onChange={this.handleChange}
            style={{ width: '380px' }}
          />

          <Button
            style={{ display: 'inline-block' }}
            key="submit"
            type="primary"
            onClick={this.handleOk}>
            Submit
        </Button>
          {
            error ?
            <Alert
            style={{ width: '380px', outline: 'none' }}
            message={message}
            type="error"
            showIcon />
            : null
          }
        </Modal>

      </div>
    );
  }
}

export default PopupBtnEventcomp;


