import React from "react";
import { Link } from "react-router-dom";

import "./filter.scss";

export default function Filter() {
  return (
    <div className="filter-sidebar">
      <Link to="/recommender">
        <button className="filter-btn">Ajánló</button>
      </Link>
      <Link to="/sort-by-rate">
        <button className="filter-btn">Legjobb helyek</button>
      </Link>
      <Link to="/newest-pins">
        <button className="filter-btn">Legújabb helyek</button>
      </Link>
    </div>
  );
}
