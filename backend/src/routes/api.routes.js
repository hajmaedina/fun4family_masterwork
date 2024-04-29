import express from "express";
import cors from "cors";
import verify from "../middlewares/verifyToken.js";

import { reviewController } from "../controllers/reviewController.js";
import { commentController } from "../controllers/commentController.js";
import { pinController } from "../controllers/pinController.js";
import { registrationController } from "../controllers/registrationController.js";
import { loginController } from "../controllers/loginController.js";
import { messageController } from "../controllers/messageController.js";
import { userController } from "../controllers/userController.js";

const router = express.Router();

router.use(cors());
router.use(express.json());


router.post("/register", registrationController.post);
router.post("/login", loginController.post);

router.post("/messages", messageController.post);

router.get("/reviews", reviewController.get);

router.get("/comments", commentController.get);
router.post("/comments/new", verify, commentController.post);
router.put("/comments/:id", verify, commentController.put);
router.delete("/comments/:id", verify, commentController.delete);

router.get("/pins", pinController.get);
router.post("/pins/new", verify, pinController.post);
router.get("/pins/:id", pinController.getById);

router.get("/users/:id", verify, userController.get);

export default router;
