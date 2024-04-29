import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star } from "@material-ui/icons";
import Comments from "../Comments/Comments";
import NewComment from "../NewComment/NewComment";

import "./commentlist.scss";

export default function CommentList(props) {
  const { id, pinUsername } = props;
  const { REACT_APP_SERVER_URL } = process.env;
  const [comments, setComments] = useState([]);
  const myStorage = window.localStorage;
  const user = myStorage.getItem("user");
  const [updateMode, setUpdateMode] = useState(false);
  const [newCommentMode, setNewCommentMode] = useState(false);
  const [average, setAverage] = useState(null);
  const [commentCount, setCommentCount] = useState(null);
  const [filterResult, setFilterResult] = useState([]);

  const countAverage = (commentData) => {
    let countComment = 0;
    let countRating = 0;
    commentData.map((comment) => {
      if (comment.pinId === id) {
        countComment++;
        countRating += parseInt(comment.rating);
      }
    });
    if (countComment === 0) {
      return;
    }
    setAverage(Math.floor(countRating / countComment));
    setCommentCount(countComment);
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const allComments = await axios.get(`${REACT_APP_SERVER_URL}/comments`);
        const commentData = allComments.data;
        setComments(commentData);
        countAverage(commentData);
        setFilterResult(commentData.filter((comment) => comment.pinId === id));
      } catch (err) {
        console.log(err);
      }
    };
    getComments();
  }, []);

  const handleNewButton = () => {
    setNewCommentMode(true);
  };

  return (
    <div className="comment-list">
      {commentCount ? (
        <div className="average" id="average-div">
          {Array(average).fill(<Star className="star" id="star-average" />)}
          {Array(5 - average).fill(<Star className="star" id="star-empty" />)} (
          {commentCount}) Visszajelzés alapján
        </div>
      ) : (
        " "
      )}

      {newCommentMode || !user || pinUsername === user ? (
        " "
      ) : (
        <button onClick={handleNewButton} className="btn new-btn">
          Értékelést írok
        </button>
      )}

      {newCommentMode && user ? (
        <NewComment
          id={id}
          comments={comments}
          setComments={setComments}
          filterResult={filterResult}
          setNewCommentMode={setNewCommentMode}
          setFilterResult={setFilterResult}
          countAverage={countAverage}
        />
      ) : (
        <Comments
          comments={comments}
          setComments={setComments}
          user={user}
          updateMode={updateMode}
          id={id}
          setUpdateMode={setUpdateMode}
          countAverage={countAverage}
        />
      )}

      {!newCommentMode && filterResult.length === 0 ? (
        <div className="single-noComment">
          <p>
            Még nincsenek értékelések! Legyél Te az első, mondd el a véleményed!
          </p>
        </div>
      ) : (
        " "
      )}
    </div>
  );
}
