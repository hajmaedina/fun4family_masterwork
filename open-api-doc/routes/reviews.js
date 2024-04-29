import express from "express";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - username
 *         - review
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: Name of the author
 *         review:
 *           type: string
 *           description: Review of the app
 *
 *       example:
 *         _id: 60c77f12835fce44a438d19b
 *         username: anna5446
 *         review: Szuper applikáció! Mindig ezt használjuk!
 */

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: The review managing API
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Returns the list of all the reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: The list of the reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */

router.get("/", (req, res) => {
  const reviews = req.app.db.get("reviews");

  res.send(reviews);
});

export default router;
