import { registrationService } from "../services/registrationService.js";

export const registrationController = {
  async post(req, res, next) {
    try {
      const data = await registrationService.saveUser(req.body);
      res.status(data.status).json(data);
    } catch (err) {
      next(err);
    }
  },
};
