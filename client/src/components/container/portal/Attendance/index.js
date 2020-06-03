import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {
  Button,
  Result,
  Spin,
  Empty,
  Form,
  InputNumber,
  message,
  Modal,
  Input,
} from 'antd';
import moment from 'moment';

import './style.css';

class Attendance extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    events: [],
    modalDisplay: false,
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get('/api/v1/event/date');
      if (data.length) {
        this.setState({
          isLoaded: true,
          events: data,
        });
      } else {
        this.setState({
          isLoaded: true,
        });
      }
    } catch (error) {
      this.setState({
        isLoaded: true,
        error,
      });
    }
  }

  onFinish = async ({ userCode }, eventCode, resetFields) => {
    const { success, error } = this;
    try {
      const {
        data: { msg },
      } = await axios.patch('/api/v1/attendance', { userCode, eventCode });
      success(msg);
      resetFields();
    } catch (err) {
      let errorMsg;
      if (err.response) {
        errorMsg = err.response.data.msg;
      } else {
        errorMsg = 'Something went wrong, please try again later';
      }
      error(errorMsg);
    }
  };

  onFinishFailed = ({
    errorFields: [
      {
        errors: [err],
      },
    ],
  }) => {
    const { error } = this;
    error(err);
  };

  handleModalSubmit = async ({
    target: {
      parentNode: {
        firstChild: { value },
      },
    },
  }) => {
    const { success, error } = this;
    const {
      props: {
        history: { push },
      },
    } = this;
    try {
      const {
        data: { msg },
      } = await axios.post('/api/v1/portal/logout', { pinCode: value });
      success(msg);
      push('/portal');
    } catch (err) {
      let errorMsg;
      if (err.response) {
        errorMsg = err.response.data.msg;
      } else {
        errorMsg = 'Something went wrong, please try again later';
      }
      error(errorMsg);
    }
  };

  success = (msg) => {
    message.success(msg);
  };

  error = (msg) => {
    message.error(msg);
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
    const { error, isLoaded, events, modalDisplay } = this.state;
    const {
      onFinish,
      onFinishFailed,
      showModal,
      hideModal,
      handleModalSubmit,
    } = this;
    const refs = events.map(() => React.createRef());
    return (
      <div className="wrapper">
        <header>
          <div className="header">
            <div className="header_logo">
              <img
                className="header_logo-img"
                src="https://svgshare.com/i/Jru.svg"
                alt="GSG Logo"
              />
              <div className="header_logo-title">
                Events <span className="header_logo-subtitle">Booker</span>
              </div>
            </div>
            <div className="attendance_header">
              <h3 className="header_title">
                Welcome to
                <span className="header_subTitle"> GSG</span>
              </h3>
              <h2 className="sub-header">
                Please enter your code to approve your attendance
              </h2>
              <h3 className="sub-header">
                You haven&apos;t booked any event yet ?{' '}
                <span>
                  <Link to="/" target="_blank">
                    Click here please
                  </Link>
                </span>
              </h3>
            </div>
            <div className="attendance__logout">
              <Button onClick={showModal}>Log out</Button>
            </div>
          </div>
          <div className="popup-modal">
            <Modal
              title="Do you really want to Log out ?"
              visible={modalDisplay}
              onCancel={hideModal}
              footer={[]}
            >
              <Input
                type="password"
                placeholder="Enter Pin Code Please"
                style={{ width: '75%', margin: '0.25rem' }}
              />
              <Button
                style={{ display: 'inline-block', margin: '0.25rem' }}
                type="primary"
                onClick={handleModalSubmit}
              >
                Log out
              </Button>
            </Modal>
          </div>
        </header>
        <div>
          {error ? (
            <Result
              status="500"
              title="500"
              subTitle="Something went Wrong, please try again later"
            />
          ) : !isLoaded ? (
            <Spin size="large" />
          ) : !events.length ? (
            <Empty description={<span>no events for today</span>} />
          ) : (
            <main>
              <ul className="main__grid">
                {events.map(
                  ({ id, image, title, category, event_code, date }, i) => (
                    <li className="card grid_item" key={id}>
                      <img className="card__image" src={image} alt={title} />
                      <div className="card__content">
                        <h3 className="card__p">
                          <b>{title}</b>
                        </h3>
                        <p className="card__p">
                          <b>By :</b> {category}
                        </p>
                        <p className="card__p">
                          <b>Time :</b> {moment(date).format('hh:mm a')}
                        </p>
                      </div>
                      <div>
                        <Form
                          layout="inline"
                          hideRequiredMark
                          size="middle"
                          ref={refs[i]}
                          onFinishFailed={onFinishFailed}
                          onFinish={(values) => {
                            const {
                              current: { resetFields },
                            } = refs[i];
                            onFinish(values, event_code, resetFields);
                          }}
                          className="attendance-form"
                        >
                          <Form.Item
                            name="userCode"
                            validateTrigger={onFinish}
                            rules={[
                              {
                                required: true,
                                type: 'integer',
                                min: 100,
                                max: 999,
                                message:
                                  "Event's code must be a number of 3 digits",
                              },
                            ]}
                          >
                            <InputNumber
                              className="attendance-form__code"
                              placeholder="userCode"
                            />
                          </Form.Item>
                          <Form.Item>
                            <Button
                              type="primary"
                              className="attendance-form__btn"
                              htmlType="submit"
                            >
                              Submit
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </main>
          )}
        </div>
      </div>
    );
  }
}
propTypes.shape({
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
});
export default Attendance;
