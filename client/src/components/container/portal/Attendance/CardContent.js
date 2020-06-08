import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

const CardContent = ({ info }) => {
  const { category, title, date } = info;

  return (
    <div className="card__content">
      <h3 className="card__p">
        <b>{title}</b>
      </h3>
      <p className="card__p">{category}</p>
      <p className="card__p">{moment(date).format('LLLL')}</p>
    </div>
  );
};

export default withRouter(CardContent);
