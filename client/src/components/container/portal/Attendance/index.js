import React from "react";
import axios from "axios";
import { Button, Result, Spin, Empty, Form, InputNumber, message } from "antd";

class Attendance extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    submiting: false,
    events: [],
  };

  componentDidMount() {
    axios
      .get("/api/v1/event")
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

  formRef = React.createRef();

  onFinish = ({userCode}, event_code) => {
    const {
      error,
      success,
      formRef: {
        current: { resetFields },
      },
    } = this;
    console.log(event_code, 'here');
    const requestBody = {
      userCode,
      eventCode : event_code,
    };
    this.setState({ loading: true });
    axios
      .patch("/api/v1/attendance", requestBody)
      .then(({ data: { msg } }) => {
        success(msg);
        resetFields();
        this.setState({ loading: false });
      })
      .catch(
        ({
          response: {
            status,
            data: { msg },
          },
        }) => {
          console.log(status, msg);
          status === 400 || status === 401
            ? error(msg)
            : error("Something went wrong, please try again later");
          this.setState({ loading: false });
        }
      );
  };

  success = (msg) => {
    message.success(msg);
  };

  error = (msg) => {
    message.error(msg);
  };

  render() {
    const { error, isLoaded, submiting, events } = this.state;
    const { formRef, onFinish } = this;
    return (
      <div className="wrapper">
        <header>
          <h1>GSG</h1>
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
                        layout="horizontal"
                        hideRequiredMark={true}
                        scrollToFirstError={true}
                        size="middle"
                        onFinish={(values, user_code) =>
                          onFinish(values, user_code)
                        }
                        ref={formRef}
                      >
                        <Form.Item
                          name="userCode"
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
                          <InputNumber />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            loading={submiting}
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
