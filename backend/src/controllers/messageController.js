import { messageService } from "../services/messageService.js";

export const messageController = {
  async post(req, res, next) {
    try {
      const data = await messageService.saveMessage(req.body);
      res.status(data.status).json(req.body);
    } catch (err) {
      next(err);
    }
  },
};
