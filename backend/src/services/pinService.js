import logger from "./../logger.js";
import Pin from "../models/Pin.js";
import pinValidation from "../validations/pinValidation.js";

export const pinService = {
  async savePin(userData) {
    try {
      const { error } = pinValidation(userData);
      if (error) {
        return {
          status: 404,
          message: error.details[0].message,
        };
      }
      const pinExist = await Pin.findOne({ place: userData.place });
      if (pinExist) {
        return {
          status: 400,
          message: "Pin already exist!",
        };
      }

      const newPin = new Pin(userData);

      await newPin.save();
      return {
        status: 200,
        message: "Pin saved",
        newPin: newPin
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
