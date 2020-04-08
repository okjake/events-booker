import React, { Component } from 'react'
import { Alert, Modal, Button, Input, message, Spin } from "antd";
import axios from 'axios';

import './PopupBtnEventcomp.css'

class PopupBtnEventcomp extends Component {
  state = {
    mobile: '',
    message: '',
    visible: false,
    error: false,
    isLoade: false,
    errorMessage:null,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      error: false,
    });
  };

  handleChange = ({target:{value}}) => {
    this.setState({ mobile: value, error: false });
  };


  handleOk = e => {
    this.setState({ isLoade: true })
    const { mobile } = this.state;
    const { eventCode, eventProg, type } = this.props
    if (type === 'booking') {
      axios.post('/api/v1/checkUser', { mobile, eventCode })
        .then(({ data }) => {
          console.log(data);

          if (data.status === 301) {
            this.props.push(`/register/${eventProg}/${eventCode}/${mobile}`);
          } else if (data.status === 400) {
            this.setState({
              error: true,
              message: data.msg,
              mobile: '',
            })
          } else {
            this.setState({
              visible: false,
              mobile: '',
            });
            message.success(data.msg, 10);
          }
          this.setState({ isLoade: false })
        })
        .catch(() => {
          this.setState({ errorMessage: "Internal server error !!" })
        })
    } else if (type === 'cancel') {
      axios.post('/api/v1/cancelUser', { mobile, eventCode })
        .then(({ data }) => {
          console.log(data);
          if (data.status === 400) {
            this.setState({
              error: true,
              message: data.msg,
              mobile: '',
            })
          } else {
            this.setState({
              visible: false,
              mobile: '',
            });
            message.error(data.msg, 10);
          }
          this.setState({ isLoade: false })
        })
        .catch(() => {
          this.setState({ errorMessage: "Internal server error !!" })
        })

    }

  };

  render() {
    const { visible, mobile, message, error, isLoade } = this.state
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
            style={{ width: '75%' }}
          />
          {isLoade && (<Spin />)}
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
                style={{ width: '75%' }}
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
