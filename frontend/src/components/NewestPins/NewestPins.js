import React from "react";
import { Star } from "@material-ui/icons";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";

import "./newestpins.scss";

export default function NewestPins(props) {
  const { pins } = props;

  return (
    <div className="most-common">
      <div className="header-div">
        <h2>Legújabb helyek</h2>
      </div>
      <Link to="/">
        <button className="btn back-btn">Vissza a főoldalra</button>
      </Link>
      {pins && pins.slice(0).reverse().map((pin) => (
        <div className="rate-card" key={pin._id}>
          <h3 className="h3-pinPlace">{pin.place}</h3>
          <h6 className="h6-created">
            Létrehozva: <TimeAgo datetime={pin.createdAt} locale="hu" />
          </h6>
          <h4>
            {Array(pin.rating).fill(<Star className="star" key={pin._id} />)}
          </h4>
          <p>{pin.desc}</p>
        </div>
      ))}
    </div>
  );
}
