import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import AttendanceSubmitForm from './AttendanceSubmitForm';

const CardContent = ({ info }) => {
  const { category, title, date, event_code } = info;
  return (
    <>
      <div className="card__content">
        <h3 className="card__p">
          <b>{title}</b>
        </h3>
        <p className="card__p">{category}</p>
        <p className="card__p">{moment(date).format('hh:mm a')}</p>
      </div>
      <AttendanceSubmitForm event_code={event_code} />
    </>
  );
};

export default withRouter(CardContent);
