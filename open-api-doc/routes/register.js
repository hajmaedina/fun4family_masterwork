import express from "express";
const router = express.Router();
import { nanoid } from "nanoid";

const idLength = 24;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: Username of the user
 *         email:
 *           type: string
 *           description: Email address of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *
 *       example:
 *         _id: 60c77f12835fce44a438d19b
 *         username: anna.miller
 *         email: a.miller@gmail.com
 *         password: appletree
 */

/**
 * @swagger
 * tags:
 *   name: Register
 *   description: The register managing API
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: 200
 *                 message:
 *                   type: string
 *                   description: User saved
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 200
 *               message: User saved
 *
 *       400:
 *         description: The user email already exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: 400
 *                 message:
 *                   type: string
 *                   description: Email already exist!
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 400
 *               message: Email already exist!
 *
 *       404:
 *         description: The user details are invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: 404
 *                 message:
 *                   type: string
 *                   description: error.details[0].message
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 404
 *               message: error.details[0].message
 *
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: 500
 *                 message:
 *                   type: string
 *                   description: Something went wrong
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 500
 *               message: Something went wrong
 */

router.post("/", (req, res) => {
  try {
    const user = {
      _id: nanoid(idLength),
      ...req.body,
    };

    req.app.db.get("users").push(user).write();

    res.send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;
