import React, { useEffect, useState } from "react";
import { Room } from "@material-ui/icons";
import Reviews from "../Reviews/Reviews";
import Filter from "../Filter/Filter";
import axios from "axios";

import "./sidebar.scss";

export default function Sidebar() {
  const [reviews, setReviews] = useState([]);
  const { REACT_APP_SERVER_URL } = process.env;

  useEffect(() => {
    const getReviews = async () => {
      try {
        const allReviews = await axios.get(`${REACT_APP_SERVER_URL}/reviews`);
        setReviews(allReviews.data);
      } catch (err) {
        console.log(err);
      }
    };
    getReviews();
  }, []);

  return (
    <div className="sidebar">
      <div className="logo-sidebar">
        <Room id="logoIcon" />
        <span>fun 4 family</span>
      </div>
      <Reviews reviews={reviews} />
      <Filter />
    </div>
  );
}
