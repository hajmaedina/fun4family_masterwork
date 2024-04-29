import logger from "./../logger.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import registerValidation from "../validations/registerValidation.js";

export const registrationService = {
  async saveUser(userData) {
    try {
      const { error } = registerValidation(userData);
      if (error) {
        return {
          status: 404,
          message: error.details[0].message,
        };
      }
      const emailExist = await User.findOne({ email: userData.email });
      if (emailExist)
        return {
          status: 400,
          message: "Email already exist!",
        };

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const user = new User({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
      });

      await user.save();
      return {
        status: 200,
        message: "User saved",
        username: userData.username,
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
