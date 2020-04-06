import React from "react";
import moment from "moment";

import "./style.css";

const Card = ({ info: { image, title, category, date }, element }) => {
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
      {element}
    </li>
  );
};

export default Card;
