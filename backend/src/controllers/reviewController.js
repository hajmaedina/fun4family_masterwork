import Review from "../models/Review.js";

export const reviewController = {
  get(req, res, next) {
    try {
      Review.find().then((foundReviews) => res.status(200).json(foundReviews));
    } catch (err) {
      next(err);
    }
  },
};
