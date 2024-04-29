import logger from "./../logger.js";
import Comment from "../models/Comment.js";
import commentValidation from "../validations/commentValidation.js";

export const commentService = {
  async saveComment(userData) {
    try {
      const { error } = commentValidation(userData);
      if (error) {
        return {
          status: 404,
          message: error.details[0].message,
        };
      }

      const newComment = new Comment(userData);

      await newComment.save();
      return {
        status: 200,
        message: "Comment saved",
        newComment: newComment,
      };
    } catch (err) {
      logger.error(err);
      return {
        status: 500,
        message: "Something went wrong",
      };
    }
  },

  async updateComment(id, reqData) {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(id, reqData, {
        useFindAndModify: false,
      });
      return {
        status: 200,
        message: "Comment updated!",
        updatedComment: updatedComment,
      };
    } catch (err) {
      logger.error(err);
      return {
        status: 500,
        message: "Something went wrong",
      };
    }
  },
};
