import { pinService } from "../services/pinService.js";
import Pin from "../models/Pin.js";

export const pinController = {
  async post(req, res, next) {
    try {
      const data = await pinService.savePin(req.body);
      res.status(data.status).json(data);
    } catch (err) {
      next(err);
    }
  },

  async get(req, res, next) {
    try {
      Pin.find().then((foundPins) => res.status(200).json(foundPins));
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      Pin.findById(req.params.id).then((foundPin) =>
        res.status(200).json(foundPin)
      );
    } catch (err) {
      next(err);
    }
  },
};
