import User from "../models/User.js";

export const userController = {
  get(req, res, next) {
    try {
      User.findById(req.params.id).then((foundUser) =>
        res.status(200).json(foundUser)
      );
    } catch (err) {
      next(err);
    }
  },
};
