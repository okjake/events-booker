import React, { Component } from 'react';
import { Alert, Modal, Button, Input, message, Spin } from 'antd';
import axios from 'axios';

import './PopupBtnEvent.css';

class PopupBtnEvent extends Component {
  state = {
    mobile: '',
    message: '',
    visible: false,
    error: false,
    isLoad: false,
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

  handleChange = ({ target: { value } }) => {
    this.setState({ mobile: value, error: false });
  };

  handleOk = async () => {
    this.setState({ isLoad: true });
    const { mobile } = this.state;
    const { eventCode, eventProg, type, push } = this.props;
    if (type === 'booking') {
      try {
        const { data } = await axios.post('/api/v1/checkUser', {
          mobile,
          eventCode,
        });
        this.setState({
          visible: false,
          mobile: '',
          isLoad: false,
        });
        message.success(data.msg, 5);
      } catch (error) {
        const { response } = error;
        const { msg } = response.data;
        if (response.status === 301) {
          push(`/register/${eventProg}/${eventCode}/${mobile}`);
        } else {
          this.setState({
            error: true,
            message: msg,
            mobile: '',
            isLoad: false,
          });
        }
      }
    } else if (type === 'cancel') {
      try {
        const { data } = await axios.post('/api/v1/cancelUser', {
          mobile,
          eventCode,
        });
        const { msg } = data;
        this.setState({
          visible: false,
          mobile: '',
          isLoad: false,
        });
        message.warning(msg, 5);
      } catch (error) {
        const { response } = error;
        const { msg } = response.data;
        this.setState({
          error: true,
          message: msg,
          mobile: '',
          isLoad: false,
        });
      }
    }
  };

  render() {
    const { visible, mobile, message, error, isLoad } = this.state;
    const { purpose, title } = this.props;
    return (
      <div className="popup-modal">
        <Button type="primary" onClick={this.showModal} shape="round" autoFocus>
          {purpose}
        </Button>
        <Modal
          title={title}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <Input
            placeholder="Enter Your Mobile Number"
            value={mobile}
            onChange={this.handleChange}
            style={{ width: '72%', padding: '9px' }}
          />

          <Button
            style={{ display: 'inline-block', height: '40px' }}
            key="submit"
            type="primary"
            onClick={this.handleOk}
          >
            {isLoad ? <Spin /> : ' Submit '}
          </Button>
          {error ? (
            <Alert
              style={{ width: '75%' }}
              message={message}
              type="error"
              showIcon
            />
          ) : null}
        </Modal>
      </div>
    );
  }
}

export default PopupBtnEvent;
