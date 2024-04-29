import express from "express";
const router = express.Router();

/**
 * @swagger
 * components:
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
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
 *   name: Users
 *   description: The user managing API
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *     security:
 *     - bearerAuth: []
 */

router.get("/:id", (req, res) => {
  const user = req.app.db.get("users").find({ _id: req.params.id }).value();

  if (!user) {
    res.sendStatus(404);
  }

  res.send(user);
});

export default router;
