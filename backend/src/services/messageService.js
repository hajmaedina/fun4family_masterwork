import logger from "./../logger.js";
import Message from "../models/Message.js";
import messageValidation from "../validations/messageValidation.js";

export const messageService = {
  async saveMessage(userData) {
    try {
      const { error } = messageValidation(userData);
      if (error) {
        return {
          status: 404,
          message: error.details[0].message,
        };
      }

      const newMessage = new Message(userData);
      await newMessage.save();

      return {
        status: 200,
        message: "Message saved",
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
