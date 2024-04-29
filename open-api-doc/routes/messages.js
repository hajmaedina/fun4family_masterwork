import express from "express";
const router = express.Router();
import { nanoid } from "nanoid";

const idLength = 24;

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - message
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the message
 *         name:
 *           type: string
 *           description: Name of the sender
 *         email:
 *           type: string
 *           description: Email of the sender
 *         message:
 *           type: string
 *           description: Message of the sender
 *
 *       example:
 *         _id: 60c77f12835fce44a438d19b
 *         name: anna5446
 *         email: anna9qn@freemail.hu
 *         message: Üdv! Nagyon szeretjük az alkalmazást, de jó lenne ha képeket is fel lehetne tölteni.
 */

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: The message managing API
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: The message was successfully created
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
 *                   description: Message saved
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 200
 *               message: Message saved
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
    const message = {
      _id: nanoid(idLength),
      ...req.body,
    };

    req.app.db.get("messages").push(message).write();

    res.send(message);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;
