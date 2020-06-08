import React, { useRef } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Button, Form, InputNumber, message } from 'antd';
import './style.css';

const AttendanceSubmitForm = (props) => {
  const { event_code } = props;
  const onFinish = async ({ userCode }, eventCode, resetFields) => {
    try {
      const {
        data: { msg },
      } = await axios.patch('/api/v1/attendance', { userCode, eventCode });
      message.success(msg);
      resetFields();
    } catch (err) {
      let errorMsg;
      if (err.response) {
        errorMsg = err.response.data.msg;
      } else {
        errorMsg = 'Something went wrong, please try again later';
      }
      message.error(errorMsg);
    }
  };

  const onFinishFailed = ({
    errorFields: [
      {
        errors: [err],
      },
    ],
  }) => {
    message.error(err);
  };
  const formRef = useRef();
  return (
    <div>
      <Form
        layout="inline"
        hideRequiredMark
        size="middle"
        onFinishFailed={onFinishFailed}
        ref={formRef}
        onFinish={(values) => {
          const {
            current: { resetFields },
          } = formRef;
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
              message: "Event's code must be a number of 3 digits",
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
  );
};
export default withRouter(AttendanceSubmitForm);
