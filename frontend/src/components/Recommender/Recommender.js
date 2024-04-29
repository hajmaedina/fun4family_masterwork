import React, { useState } from "react";
import { Link } from "react-router-dom";
import FilterCards from "../FilterCards/FilterCards";

import "./recommender.scss";

export default function Recommender(props) {
  const { pins } = props;
  const { REACT_APP_GOOGLE_API_KEY } = process.env;
  const [status, setStatus] = useState(null);
  const [filterByDistance, setFilterByDistance] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [userAddress, setUserAddress] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Sajnos a böngésződ nem támogatja a keresést!");
    } else {
      setStatus("Keresés...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          getAddress(position.coords.latitude, position.coords.longitude)
            .then((res) => setUserAddress(res.formatted_address.split(",")[0]))
            .catch(console.error);
            console.log(userAddress)
          setFilterByDistance(
            pins.map((pin) => {
              const distance = calculateDistance(
                pin.lat,
                pin.long,
                position.coords.latitude,
                position.coords.longitude
              );
              filterByDistance.push({ distance, pin });
              filterByDistance.sort(
                (a, b) => parseInt(a.distance) - parseInt(b.distance)
              );
              return filterByDistance;
            })
          );
          setShowFilter(true);
        },
        () => {
          setStatus("Sajnos nem találjuk hol vagy!");
        }
      );
    }
  };

  const calculateDistance = (pinLat, pinLng, lat, lng) => {
    const toRadian = (n) => (n * Math.PI) / 180;
    let lat2 = pinLat;
    let lon2 = pinLng;
    let lat1 = lat;
    let lon1 = lng;
    let R = 6371; // km
    let x1 = lat2 - lat1;
    let dLat = toRadian(x1);
    let x2 = lon2 - lon1;
    let dLon = toRadian(x2);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadian(lat1)) *
        Math.cos(toRadian(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    let distance = parseInt(d);
    return distance;
  };

  function getAddress(latitude, longitude) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();

      let method = "GET";
      let url =
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=` +
        latitude +
        "," +
        longitude +
        `&key=${REACT_APP_GOOGLE_API_KEY}` +
        "&sensor=true";
      let async = true;

      request.open(method, url, async);
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status === 200) {
            let data = JSON.parse(request.responseText);
            let address = data.results[0];
            resolve(address);
          } else {
            reject(request.status);
          }
        }
      };
      request.send();
    });
  }

  return (
    <div className="recommender">
      <div className="header-div">
        <h2>Ajánló</h2>
        <Link to="/">
          <button className="btn back-btn">Vissza a főoldalra</button>
        </Link>
        {!showFilter && (
          <>
            <h3>Nézd meg a hozzád legközelebbi helyeket!</h3>
            <button className="btn location-btn" onClick={getLocation}>
              Keresd meg hol vagyok!
            </button>
            <p className="p-status">{status}</p>
          </>
        )}
      </div>
      {showFilter && (
        <FilterCards
          userAddress={userAddress}
          filterByDistance={filterByDistance[0]}
        />
      )}
    </div>
  );
}
