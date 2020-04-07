import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import "./style.css";

const Card = ({ info }) => {
  const { image, title, category, date, event_code } = info;
  return (
    <li className="card">
      <img className="card__image" src={image} alt={title} />
      <div className="card__content">
        <h3 className="card__p">
          <b>{title}</b>
        </h3>
        <p className="card__p">
          <b>By :</b> {category}
        </p>
        <p className="card__p">
          <b>Date :</b> {moment(date).format("LLLL")}
        </p>
      </div>
      <Link
        to={{
          pathname: `/events/${category}/${event_code}`,
          state: { info },
        }}
        className="ant-btn ant-btn-round ant-btn-override"
      >
        Take A Part
      </Link>
    </li>
  );
};

export default Card;
