import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Button, Form, Modal, Input, message, Alert } from 'antd';

class AttendanceLogout extends Component {
  state = {
    modalDisplay: false,
    errorMsg: '',
    error: false,
  };

  handleModalSubmit = async ({ pinCode }) => {
    const {
      props: {
        history: { push },
      },
    } = this;
    try {
      const {
        data: { msg },
      } = await axios.post('/api/v1/portal/logout', { pinCode });
      message.success(msg);
      push('/portal');
    } catch (err) {
      if (err.response) {
        this.setState({
          error: true,
          errorMsg: err.response.data.msg,
        });
      } else {
        this.setState({
          error: true,
          errorMsg: 'Something went wrong, please try again later',
        });
      }
    }
  };

  showModal = () => {
    this.setState({
      modalDisplay: true,
    });
  };

  hideModal = () => {
    this.setState({
      modalDisplay: false,
    });
  };

  render() {
    const { modalDisplay, error, errorMsg } = this.state;
    const { showModal, hideModal, handleModalSubmit } = this;
    return (
      <div className="popup-modal">
        <Button onClick={showModal}>Log out</Button>
        <Modal
          title="Do you really want to Log out ?"
          visible={modalDisplay}
          onCancel={hideModal}
          footer={[]}
        >
          <Form onFinish={handleModalSubmit}>
            <Form.Item
              name="pinCode"
              rules={[{ message: 'Please input your pin-code!' }]}
              style={{ width: '75%', margin: '0.25rem' }}
            >
              <Input.Password placeholder="Enter Pin Code Please" />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ display: 'inline-block', margin: '0.25rem' }}
                type="primary"
                htmlType="submit"
              >
                Log out
              </Button>
            </Form.Item>
          </Form>
          {error ? (
            <Alert
              style={{ width: '75%' }}
              message={errorMsg}
              type="error"
              showIcon
            />
          ) : null}
        </Modal>
      </div>
    );
  }
}

export default withRouter(AttendanceLogout);
