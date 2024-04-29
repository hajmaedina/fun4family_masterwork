import React, { useState } from "react";
import axios from "axios";

import "./newcomment.scss";

export default function NewComment(props) {
  const {
    comments,
    setComments,
    setNewCommentMode,
    filterResult,
    setFilterResult,
    id,
    countAverage,
  } = props;
  const { REACT_APP_SERVER_URL } = process.env;
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const myStorage = window.localStorage;
  const user = myStorage.getItem("user");
  const userToken = myStorage.getItem("token");

  const handleNewComment = async (e) => {
    e.preventDefault();
    const newComment = {
      username: user,
      desc,
      rating: star,
      pinId: id,
    };

    try {
      const res = await axios.post(
        `${REACT_APP_SERVER_URL}/comments/new`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setComments([...comments, res.data.newComment]);
      setNewCommentMode(false);
      countAverage([...comments, res.data.newComment]);
      setFilterResult([...filterResult, res.data.newComment]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="newComment-page">
      <form onSubmit={handleNewComment} id="newComment-form">
        <label>Megjegyzés</label>
        <textarea
          placeholder="Mondj valamit erről a helyről"
          onChange={(e) => setDesc(e.target.value)}
        />
        <label>Értékelés</label>
        <select onChange={(e) => setStar(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <div className="comment-buttons">
          <button type="submit" className="submitButton comment-btn">
            Megjegyzés mentése
          </button>
          <button
            type="button"
            className="submitButton comment-btn"
            onClick={() => setNewCommentMode(false)}
          >
            Mégsem
          </button>
        </div>
      </form>
    </div>
  );
}
