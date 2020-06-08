import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import { Button, Result, Spin, Empty, Form, InputNumber, message } from 'antd';
import moment from 'moment';

import './style.css';
import Header from './Header/Header';

class Attendance extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    events: [],
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

  success = (msg) => {
    message.success(msg);
  };

  error = (msg) => {
    message.error(msg);
  };

  render() {
    const { error, isLoaded, events } = this.state;
    const { onFinish, onFinishFailed } = this;
    const refs = events.map(() => React.createRef());
    return (
      <div className="wrapper">
        <Header />
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
