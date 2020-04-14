import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  TimePicker,
  message,
} from "antd";
import moment from "moment";
import axios from "axios";

import "./style.css";

class AddEvent extends React.Component {
  state = {
    loading: false,
  };

  formRef = React.createRef();

  onFinish = ({
    title,
    image,
    category,
    details,
    dayMonthYear,
    hourMinuteSecond,
    eventCode,
    duration,
  }) => {
    const { error, success } = this;
    const date =
      moment(dayMonthYear._d).format("YYYY-MM-DD") +
      " " +
      moment(hourMinuteSecond._d).format("hh:mm:ss");
    const requestBody = {
      title,
      image,
      category,
      details,
      date,
      eventCode,
      duration,
    };
    this.setState({ loading: true });
    axios
      .post("/api/v1/event", requestBody)
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
            ? msg === "invalid inputs"
              ? error("image must be a valid url")
              : error(msg)
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

  onReset = () => {
    const {
      formRef: {
        current: { resetFields },
      },
    } = this;
    resetFields();
  };

  render() {
    const { loading } = this.state;
    const { onReset, formRef, onFinish } = this;
    return (
      <div>
        <Form
          hideRequiredMark={true}
          scrollToFirstError={true}
          onFinish={onFinish}
          ref={formRef}
          layout="horizontal"
          className="event-form"
        >
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Please input event title!",
              },
            ]}
          >
            <Input className="ant-input-override" placeholder="Event Title" />
          </Form.Item>
          <Form.Item
            name="image"
            rules={[
              {
                required: true,
                message: "Please input event image!",
              },
              {
                type: "url",
                message: "event image should be a url",
              },
            ]}
          >
            <Input className="ant-input-override" placeholder="Event Image" />
          </Form.Item>
          <Form.Item
            name="category"
            rules={[
              {
                required: true,
                message: "Please select a category",
              },
            ]}
          >
            <Select className="ant-input-override" placeholder="Event Category">
              <Select.Option value="Public">Public</Select.Option>
              <Select.Option value="Code Academy">Code Academy</Select.Option>
              <Select.Option value="Freelance">Freelance</Select.Option>
              <Select.Option value="Startups">Startups</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="details"
            rules={[
              {
                required: true,
                message: "Please write a description for the event",
              },
            ]}
          >
            <Input.TextArea
              className="ant-input-override"
              placeholder="Event Description"
            />
          </Form.Item>
          <Form.Item
            name="dayMonthYear"
            rules={[
              {
                required: true,
                message: "Please select event's date",
              },
            ]}
          >
            <DatePicker
              className="ant-input-override"
              placeholder="Event Date"
            />
          </Form.Item>
          <Form.Item
            name="hourMinuteSecond"
            rules={[
              {
                required: true,
                message: "Please select event's time",
              },
            ]}
          >
            <TimePicker
              className="ant-input-override"
              placeholder="Event Time"
            />
          </Form.Item>
          <Form.Item
            name="eventCode"
            rules={[
              {
                required: true,
                type: "integer",
                min: 100,
                max: 999,
                message: "Event's code must be a number of 3 digits",
              },
            ]}
          >
            <InputNumber
              className="ant-input-override"
              placeholder="Event Code"
            />
          </Form.Item>
          <Form.Item
            name="duration"
            rules={[
              {
                required: true,
                type: "integer",
                message: "Event's duration should be in minutes",
              },
            ]}
          >
            <InputNumber
              className="ant-input-override"
              placeholder="Event Duration"
            />
          </Form.Item>
          <Form.Item className="event-form__btns">
            <Button
              className="event-form__btn"
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
            >
              Submit
            </Button>
            <Button
              className="event-form__btn"
              htmlType="button"
              onClick={onReset}
              size="large"
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddEvent;
