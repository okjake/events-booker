import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

const CardContent = ({ history, info }) => {
  const { category, event_code, title, date } = info;

  const takePart = () =>
    history.push({
      pathname: `/events/${category}/${event_code}`,
      state: { info },
    });

  return (
    <div className="card__content">
      <h3 className="card__p">
        <b>{title}</b>
      </h3>
      <p className="card__p">{category}</p>
      <p className="card__p">{moment(date).format('LLLL')}</p>
      <button onClick={takePart} type="button" className="card__btn">
        Take A Part
      </button>
    </div>
  );
};

export default withRouter(CardContent);
