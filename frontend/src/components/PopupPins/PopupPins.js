import React from "react";
import { Popup } from "react-map-gl";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";
import { Star } from "@material-ui/icons";

import "./popuppins.scss";

export default function PopupPins(props) {
  const { pin, setCurrentPlaceId } = props;

  return (
    <Popup
      id="popup"
      key={pin._id + "popup"}
      latitude={pin.lat}
      longitude={pin.long}
      closeButton={true}
      closeOnClick={false}
      onClose={() => setCurrentPlaceId(null)}
      anchor="left"
    >
      <div className="card" id="popup-card" key={pin._id + "card"}>
        <label>Hely</label>
        <h4 className="place">{pin.place}</h4>
        <label>Leírás</label>
        <p className="desc">{pin.desc}</p>
        <label>Értékelés</label>
        <div className="stars">
          {Array(pin.rating).fill(<Star className="star" />)}
        </div>
        <label>Információ</label>
        <span className="username">
          Készítette <b>{pin.username}</b>
        </span>
        <span className="date">
          <TimeAgo datetime={pin.createDate} locale="hu" />
        </span>
        <Link to={`/comments/${pin._id}`}>
          <button className="pin-btn">Hozzászólások</button>
        </Link>
      </div>
    </Popup>
  );
}
