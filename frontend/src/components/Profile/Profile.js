import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Star } from "@material-ui/icons";
import { Link } from "react-router-dom";

import "./profile.scss";

export default function Profile(props) {
  const { pins } = props;
  const { id } = useParams();
  const { REACT_APP_SERVER_URL } = process.env;
  const myStorage = window.localStorage;
  const [userDetails, setUser] = useState([]);
  const userToken = myStorage.getItem("token");
  const user = myStorage.getItem("user");
  const [error, setError] = useState(false);
  const [myPins, setMyPins] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${REACT_APP_SERVER_URL}/users/` + id, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setUser(res.data);
        setError(false);
        setMyPins(pins.filter((pin) => pin.username === user));
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    getUser();
  }, []);

  return (
    <div className="profile-page">
      <div className="header-div">
        {error ? <h2>Regisztrálj vagy jelentkezz be!</h2> : <h2>Profilom</h2>}
        <Link to="/">
          <button className="back-btn btn">Vissza a főoldalra</button>
        </Link>
      </div>
      {error ? (
        " "
      ) : (
        <>
          <h3>Adataim</h3>
          <div className="user-details">
            <p>
              <strong>Felhasználó név: </strong>
              {userDetails.username}
            </p>
            <p>
              <strong>Email cím: </strong>
              {userDetails.email}
            </p>
          </div>
          {myPins.length === 0 ? (
            <h3>Sajnos még nincsenek jelöléseid!</h3>
          ) : (
            <h3>Jelöléseim</h3>
          )}
        </>
      )}
      {myPins.map((pin) => {
        return (
          <div className="single-pin">
            <p>
              <h3 className="h3-place">{pin.place}</h3>
            </p>
            <p>
              <strong>Leírás: </strong>
              {pin.desc}
            </p>
            <p>
              <strong>Értékelés: </strong>
              {Array(pin.rating).fill(
                <Star className="star" id="star-rating" />
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
