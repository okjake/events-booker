import React, { Component } from 'react'
import './PopupBtnEventcomp.css'

import { Modal, Button, Input } from "antd";
import axios from 'axios';

class PopupBtnEventcomp extends Component {
  state = {
    visible: false,
    mobileNo: ''
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    e.preventDefault();
    axios.post('/api/v1/checkUser',
      { mobile: this.state.mobileNo, eventCode: '302' })
      .then(res => console.log(res))
      .catch(err => console.error(err))
    this.setState({
      visible: false,
    });
    
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleChange = e => {
    this.setState({ mobileNo: e.target.value });
  };

  render() {
    const { visible, mobileNo } = this.state
    return (
      <div className='popup-modal'>
        <Button type="primary" onClick={this.showModal} shape="round" autoFocus>
          {this.props.purpose}
        </Button>
        <Modal
          className='modal'
          title={this.props.title}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <Input
            placeholder="Enter Your Mobile Number"
            value={mobileNo}
            onChange={this.handleChange}
          />
        </Modal>
      </div>
    );
  }
}

export default PopupBtnEventcomp;


