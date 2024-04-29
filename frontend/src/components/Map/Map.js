import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { Room } from "@material-ui/icons";
import PopupPins from "../PopupPins/PopupPins";
import NewPin from "../NewPin/NewPin";
import Navbar from "../Navbar/Navbar";

import "./map.scss";

export default function Map(props) {
  const { pins, setPins } = props;
  const { REACT_APP_MAPBOX, REACT_APP_MAPSTYLE } = process.env;
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(
    myStorage.getItem("user")
  );
  const [currentToken, setCurrentToken] = useState(myStorage.getItem("token"));
  const [userId, setUserId] = useState(myStorage.getItem("userId"));

  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 47.1,
    longitude: 19.4,
    zoom: 6.5,
  });

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={REACT_APP_MAPBOX}
      width="100%"
      height="100%"
      transitionDuration="200"
      mapStyle={REACT_APP_MAPSTYLE}
      onViewportChange={(viewport) => setViewport(viewport)}
      onDblClick={currentUsername && currentToken && handleAddClick}
    >
      {pins.map((pin) => (
        <div>
          {!currentPlaceId && (
            <Marker
              id="marker"
              key={pin._id + "marker"}
              latitude={pin.lat}
              longitude={pin.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                id="room"
                key={pin._id + "room"}
                style={{
                  zIndex: 1,
                  fontSize: 7 * viewport.zoom,
                  color:
                    currentUsername === pin.username ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(pin._id, pin.lat, pin.long)}
              />
            </Marker>
          )}
          {pin._id === currentPlaceId && (
            <PopupPins
              key={pin._id}
              pin={pin}
              setCurrentPlaceId={setCurrentPlaceId}
            />
          )}
        </div>
      ))}
      {newPlace && (
        <NewPin
          currentUsername={currentUsername}
          newPlace={newPlace}
          setNewPlace={setNewPlace}
          pins={pins}
          setPins={setPins}
          viewport={viewport}
        />
      )}
      <Navbar
        userId={userId}
        setUserId={setUserId}
        currentUsername={currentUsername}
        setCurrentUsername={setCurrentUsername}
        currentToken={currentToken}
        setCurrentToken={setCurrentToken}
        myStorage={myStorage}
      />
    </ReactMapGL>
  );
}
