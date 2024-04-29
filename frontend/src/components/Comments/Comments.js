import React, { useState } from "react";
import axios from "axios";
import { Star } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import "./comments.scss";

export default function Comments(props) {
  const {
    comments,
    setComments,
    user,
    updateMode,
    id,
    setUpdateMode,
    countAverage,
  } = props;
  const { REACT_APP_SERVER_URL } = process.env;
  const [newDesc, setNewDesc] = useState("");
  const myStorage = window.localStorage;
  const userToken = myStorage.getItem("token");

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`${REACT_APP_SERVER_URL}/comments/${commentId}`, {
        data: { _id: commentId, username: user },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setUpdateMode(false);
      countAverage(comments.filter((comment) => comment._id !== commentId));
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (desc) => {
    setUpdateMode(true);
    setNewDesc(desc);
  };

  const handleCancel = async () => {
    setUpdateMode(false);
  };

  const handleUpdate = async (commentId) => {
    try {
      await axios.put(
        `${REACT_APP_SERVER_URL}/comments/${commentId}`,
        {
          username: user,
          desc: newDesc,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const allComments = await axios.get(`${REACT_APP_SERVER_URL}/comments`);
      const commentData = allComments.data;
      setUpdateMode(false);
      setComments(commentData);
      countAverage(commentData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {comments.map((comment) => {
        if (comment.pinId === id) {
          if (user === comment.username) {
            return (
              <div className="single-comment" key={comment._id}>
                {updateMode ? (
                  <>
                    <input
                      type="text"
                      id="updateInput"
                      value={newDesc}
                      className="singleDescInput"
                      autoFocus
                      onChange={(e) => setNewDesc(e.target.value)}
                    />
                    <div>
                      <p>
                        Szerző: <strong>{comment.username}</strong>
                      </p>
                      <p>
                        Értékelés:{" "}
                        {Array(comment.rating).fill(
                          <Star className="star" id="star-rating" />
                        )}
                      </p>
                    </div>
                    <CheckCircleIcon
                      className="singleCommentButton"
                      onClick={() => handleUpdate(comment._id)}
                    />
                    <CancelIcon
                      className="singleCommentButton"
                      onClick={handleCancel}
                    />
                  </>
                ) : (
                  <>
                    <p>{comment.desc}</p>
                    <div>
                      <p>
                        Szerző: <strong>{comment.username}</strong>
                      </p>
                      <p>
                        Értékelés:{" "}
                        {Array(comment.rating).fill(
                          <Star className="star" id="star-rating" />
                        )}
                      </p>
                    </div>
                    <EditIcon
                      className="singleCommentIcon edit"
                      onClick={() => handleEdit(comment.desc)}
                    />
                    <DeleteIcon
                      className="singleCommentIcon trash"
                      onClick={() => handleDelete(comment._id)}
                    />
                  </>
                )}
              </div>
            );
          }
          return (
            <div className="single-comment" key={comment._id}>
              <p>{comment.desc}</p>
              <div>
                <p>
                  Szerző: <strong>{comment.username}</strong>
                </p>
                <p>
                  Értékelés:{" "}
                  {Array(comment.rating).fill(
                    <Star className="star" id="star-rating" />
                  )}
                </p>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
