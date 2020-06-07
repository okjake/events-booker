import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Empty } from 'antd';

const UserTable = ({ title, users }) => (
  <div className="content-t">
    <ReactHTMLTableToExcel
      id="test-table-xls-button"
      className="download-table-xls-button"
      table="table-to-xls"
      filename={title}
      sheet="tablexls"
      buttonText="Export to Excel"
    />

    {!users.length ? (
      <Empty description={<span>No users for this event</span>} />
    ) : (
      <table id="table-to-xls" className="table-user">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Location</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {users.map(
            ({
              first_name,
              last_name,
              location,
              email,
              mobile,
              attendance,
            }) => (
              <tr key={first_name}>
                <td>{`${first_name} ${last_name}`} </td>
                <td>{mobile}</td>
                <td>{email}</td>
                <td>{location}</td>
                <td>{attendance ? 'true' : 'false'}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    )}
  </div>
);

export default UserTable;
