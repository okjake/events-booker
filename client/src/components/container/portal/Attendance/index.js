import React from "react";
import axios from "axios";
import { Button, Result, Spin, Empty, Form, InputNumber, message } from "antd";

import "./style.css";

class Attendance extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    events: [],
  };

  componentDidMount() {
    axios
      .get("/api/v1/event/date")
      .then(({ data }) => {
        this.setState({
          isLoaded: true,
          events: data,
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }

  onFinish = ({ userCode, eventCode }) => {
    const { success, error } = this;
    axios
      .patch("/api/v1/attendance", {
        userCode,
        eventCode,
      })
      .then(({ data: { msg } }) => {
        success(msg);
        this.setState({ loading: false });
      })
      .catch(
        ({
          response: {
            status,
            data: { msg },
          },
        }) => {
          status === 400
            ? error(msg)
            : error("Something went wrong, please try again later");
          this.setState({ loading: false });
        }
      );
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
            </div>
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
                {events.map(({ id, image, title, category, event_code }) => (
                  <li className="card grid_item" key={id}>
                    <img className="card__image" src={image} alt={title} />
                    <div className="card__content">
                      <h3 className="card__p">
                        <b>{title}</b>
                      </h3>
                      <p className="card__p">
                        <b>By :</b> {category}
                      </p>
                    </div>
                    <div>
                      <Form
                        layout="inline"
                        hideRequiredMark={true}
                        size="middle"
                        onFinishFailed={onFinishFailed}
                        onFinish={onFinish}
                        className="attendance-form"
                        initialValues={{
                          eventCode: event_code,
                        }}
                      >
                        <Form.Item
                          name="eventCode"
                          className="attendance-form__hidden-input"
                        >
                          <InputNumber />
                        </Form.Item>
                        <Form.Item
                          name="userCode"
                          validateTrigger={onFinish}
                          rules={[
                            {
                              required: true,
                              type: "integer",
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
                ))}
              </ul>
            </main>
          )}
        </div>
      </div>
    );
  }
}

export default Attendance;
