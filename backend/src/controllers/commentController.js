import { commentService } from "../services/commentService.js";
import Comment from "../models/Comment.js";

export const commentController = {
  async get(req, res, next) {
    try {
      Comment.find().then((foundComments) =>
        res.status(200).json(foundComments)
      );
    } catch (err) {
      next(err);
    }
  },

  async put(req, res, next) {
    try {
      const { id } = req.params;
      const reqData = req.body;

      const data = await commentService.updateComment(id, reqData);
      res.status(data.status).json(reqData);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const comment = await Comment.findById(req.params.id);
      try {
        await comment.delete();
        res.status(200).json("Comment has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      next(err);
    }
  },

  async post(req, res, next) {
    try {
      const data = await commentService.saveComment(req.body);
      res.status(data.status).json(data);
    } catch (err) {
      next(err);
    }
  },
};
