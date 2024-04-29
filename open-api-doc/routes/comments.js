import express from "express";
const router = express.Router();
import { nanoid } from "nanoid";

const idLength = 24;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - username
 *         - desc
 *         - pinId
 *         - rating
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         username:
 *           type: string
 *           description: Name of the author
 *         desc:
 *           type: string
 *           description: Description of the place
 *         pinId:
 *           type: string
 *           description: Id of the commented pin
 *         rating:
 *           type: number
 *           description: Place rating
 *
 *       example:
 *         _id: 60c77f12835fce44a438d19b
 *         username: anna52
 *         desc: Szuper hely! Máskor is eljövünk!
 *         pinId: wellf78nszbfjsjh
 *         rating: 4
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The comment managing API
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Returns the list of all the comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: The list of the comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Something went wrong
 */

router.get("/", (req, res) => {
  const comments = req.app.db.get("comments");

  res.send(comments);
});

/**
 * @swagger
 * /comments/new:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The comment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 * 
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 * 
 *       404:
 *         description: The comment details are invalid
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
 *     security:
 *     - bearerAuth: []
 */

router.post("/new", (req, res) => {
  try {
    const comment = {
      _id: nanoid(idLength),
      ...req.body,
    };

    req.app.db.get("comments").push(comment).write();

    res.send(comment);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update the comment by the id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The comment was updated
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
 *                   description: Comment updated
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 200
 *               message: Comment updated
 *
 *       400:
 *         description: The comment not belong to the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: 401
 *                 message:
 *                   type: string
 *                   description: You can update only your comment!
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 401
 *               message: You can update only your comment!
 * 
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
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
 *     security:
 *     - bearerAuth: []
 */

router.put("/:id", (req, res) => {
  try {
    req.app.db
      .get("comments")
      .find({ _id: req.params.id })
      .assign(req.body)
      .write();

    res.send(req.app.db.get("comments").find({ _id: req.params.id }));
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Remove the comment by id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *
 *     responses:
 *       200:
 *         description: The comment was deleted
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
 *                   description: Comment has been deleted
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 200
 *               message: Comment has been deleted
 *
 *       400:
 *         description: The comment not belong to the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: 401
 *                 message:
 *                   type: string
 *                   description: You can delete only your comment!
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 401
 *               message: You can delete only your comment!
 * 
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *     security:
 *     - bearerAuth: []
 */

router.delete("/:id", (req, res) => {
  req.app.db.get("comments").remove({ _id: req.params.id }).write();

  res.sendStatus(200);
});

export default router;
