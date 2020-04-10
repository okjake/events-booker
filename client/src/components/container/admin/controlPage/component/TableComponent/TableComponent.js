import React from 'react'
import { Link } from "react-router-dom";

import { Table, Button } from 'antd';
import axios from 'axios';

import './TableComponent.css'

const TableComponent = ({ data, tableDetails }) => {
  console.log(tableDetails);
  const {
    col1_title,
    col2_title,
    col3_title,
    col4_title,
    col5_title,
    col1_dataIndex,
    col2_dataIndex,
    col3_dataIndex,
    col4_dataIndex,
    col5_dataIndex,
    type
  } = tableDetails
  const columns = [
    {
      title: col1_title,
      dataIndex: col1_dataIndex,
      key: col1_dataIndex,
    },
    {
      title: col2_title,
      dataIndex: col2_dataIndex,
      key: col2_dataIndex,
    },
    {
      title: col3_title,
      dataIndex: col3_dataIndex,
      key: col3_dataIndex,
    },
    {
      title: col4_title,
      dataIndex: col4_dataIndex,
      key: col4_dataIndex,
    },
    {
      title: col5_title,
      dataIndex: col5_dataIndex,
      key: col5_dataIndex,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
      handelEventButtons(record)
      )
    },
  ];

  const handelEventButtons = (record) => (
      <div>
        <Link to={`/dashboard/${record.event_code}/users`}>Show </Link>
        <Button type="primary" onClick={() => handleAction(record.id)}>
          Delete
        </Button>
      </div>

    
  )

  const handleAction = currentEvent => {
    console.log('this is the record value', currentEvent)
    axios.patch("/event", {'id': currentEvent})
    .then(() => {
      console.log("done");
    })
    .catch(() => {
      console.error("error");
    });
  };

  return (
    <div className='table'>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default TableComponent
