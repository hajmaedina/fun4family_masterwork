import React from "react";
import { Star } from "@material-ui/icons";
import { Link } from "react-router-dom";

import "./sortbyrate.scss";

export default function SortByRate(props) {
  const { pins } = props;

  return (
    <div className="sort-by-rate">
      <div className="header-div">
        <h2>Legjobb helyek</h2>
      </div>
      <Link to="/">
        <button className="btn back-btn">Vissza a főoldalra</button>
      </Link>
      {pins
        .sort(function (a, b) {
          return b.rating - a.rating;
        })
        .map((pin) => (
          <div className="rate-card" key={pin._id}>
            <h3 className="h3-pinPlace">{pin.place}</h3>
            <h4>{Array(pin.rating).fill(<Star className="star" />)}</h4>
            <p>{pin.desc}</p>
          </div>
        ))}
    </div>
  );
}
