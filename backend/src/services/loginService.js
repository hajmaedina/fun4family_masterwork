import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import logger from "./../logger.js";

import loginValidation from "../validations/loginValidation.js";
import User from "../models/User.js";

export const loginService = {
  async loginUser(loginData) {
    const { error } = loginValidation(loginData);
    if (error) {
      return {
        status: 404,
        message: error.details[0].message,
      };
    }

    const user = await User.findOne({ username: loginData.username });
    if (!user) {
      return {
        status: 400,
        message: "User is not registered",
      };
    }

    const validPass =
      (await bcrypt.compare(loginData.password, user.password)) ||
      loginData.password === user.password;
    if (!validPass) {
      return {
        status: 403,
        message: "Password is incorrect",
      };
    }

    try {
      const authToken = jwt.sign(
        { tokenId: user.id },
        process.env.TOKEN_SECRET
      );

      return {
        status: 200,
        message: "Logged in!",
        token: authToken,
        username: user.username,
        id: user.id,
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
