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
          layout="horizontal"
          hideRequiredMark={true}
          labelAlign="left"
          scrollToFirstError={true}
          size="middle"
          colon={false}
          onFinish={onFinish}
          ref={formRef}
        >
          <Form.Item
            label="Event Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input event title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Event Image"
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
            <Input />
          </Form.Item>
          <Form.Item
            label="Event Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please select a category",
              },
            ]}
          >
            <Select>
              <Select.Option value="Public">Public</Select.Option>
              <Select.Option value="Code Academy">Code Academy</Select.Option>
              <Select.Option value="Freelance">Freelance</Select.Option>
              <Select.Option value="Startups">Startups</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Event Description"
            name="details"
            rules={[
              {
                required: true,
                message: "Please write a description for the event",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Event Date"
            name="dayMonthYear"
            rules={[
              {
                required: true,
                message: "Please select event's date",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Event Time"
            name="hourMinuteSecond"
            rules={[
              {
                required: true,
                message: "Please select event's time",
              },
            ]}
          >
            <TimePicker />
          </Form.Item>
          <Form.Item
            label="Event Code"
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
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Event Duration"
            name="duration"
            rules={[
              {
                required: true,
                type: "integer",
                message: "Event's duration should be in minutes",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddEvent;
