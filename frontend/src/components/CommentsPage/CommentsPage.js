import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentList from "../CommentList/CommentList";

import "./commentspage.scss";

export default function CommentsPage() {
  const { id } = useParams();
  const { REACT_APP_SERVER_URL } = process.env;
  const [pin, setPin] = useState([]);
  const myStorage = window.localStorage;
  const userToken = myStorage.getItem("token");

  useEffect(() => {
    const getPin = async () => {
      try {
        const res = await axios.get(`${REACT_APP_SERVER_URL}/pins/` + id, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setPin(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPin();
  }, []);

  return (
    <div className="comments-page">
      <div className="comments-header">
        <h2>{pin.place}</h2>
        <p>{pin.desc}</p>
        <p className="username">
          Ezt a helyet <strong>{pin.username}</strong> jelölte meg
        </p>
      </div>
      <div className="comments">
        <CommentList id={id} pinUsername={pin.username} />
      </div>
    </div>
  );
}
