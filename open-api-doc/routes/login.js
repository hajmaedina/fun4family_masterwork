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
 *   name: Login
 *   description: The login managing API
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login registered user
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: user name
 *                 password:
 *                   type: string
 *                   description: user password
 *               required:
 *                 - username
 *                 - password
 *             example:
 *               username: appletree
 *               password: 60c77f12835
 *     responses:
 *       200:
 *         description: The user successfully logged in
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
 *                   description: Logged in!
 *                 token:
 *                   type: string
 *                   description: user token
 *                 username:
 *                   type: string
 *                   description: username of user
 *                 id:
 *                   type: string
 *                   description: id of user
 *               required:
 *                 - status
 *                 - message
 *                 - token
 *                 - username
 *                 - id
 *             example:
 *               status: 200
 *               message: Logged in!
 *               token: jidsf878hd6jf66gjszeMSH_KDUE55FE
 *               username: anna.miller
 *               id: 759ngy98fhhq429gagh
 *
 *       400:
 *         description: User is not registered
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
 *                   description: User is not registered!
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 400
 *               message: User is not registered!
 *
 *       404:
 *         description: The user login details are invalid
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
 *       403:
 *         description: The user login password is incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: 403
 *                 message:
 *                   type: string
 *                   description: Password is incorrect
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 403
 *               message: Password is incorrect
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
