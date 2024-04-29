import express from "express";
const router = express.Router();
import { nanoid } from "nanoid";

const idLength = 24;

/**
 * @swagger
 * components:
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 *   schemas:
 *     Pin:
 *       type: object
 *       required:
 *         - username
 *         - place
 *         - desc
 *         - rating
 *         - lat
 *         - long
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the pin
 *         username:
 *           type: string
 *           description: Name of the author
 *         place:
 *           type: string
 *           description: Name of the place
 *         desc:
 *           type: string
 *           description: Description
 *         rating:
 *           type: number
 *           description: Place rating
 *         lat:
 *           type: number
 *           description: Place latitude
 *         long:
 *           type: number
 *           description: Place longitude
 *
 *       example:
 *         _id: 60c77f12835fce44a438d19b
 *         username: anna5446
 *         place: Budapesti Nagycirkusz
 *         desc: Szuper hely
 *         rating: 4
 *         lat: 48
 *         long: 46
 */

/**
 * @swagger
 * tags:
 *   name: Pins
 *   description: The pin managing API
 */

/**
 * @swagger
 * /pins:
 *   get:
 *     summary: Returns the list of all the pins
 *     tags: [Pins]
 *     responses:
 *       200:
 *         description: The list of the pins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pin'
 *       400:
 *         description: Something went wrong
 */

router.get("/", (req, res) => {
  const pins = req.app.db.get("pins");

  res.send(pins);
});

/**
 * @swagger
 * /pins/new:
 *   post:
 *     summary: Create a new pin
 *     tags: [Pins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pin'
 *     responses:
 *       200:
 *         description: The pin was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pin'
 *
 *       400:
 *         description: The pin already exist
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
 *                   description: Pin already exist!
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 400
 *               message: Pin already exist!
 *
 *       404:
 *         description: The pin details are invalid
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
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *     security:
 *     - bearerAuth: []
 */

router.post("/new", (req, res) => {
  try {
    const pin = {
      _id: nanoid(idLength),
      ...req.body,
    };

    req.app.db.get("pins").push(pin).write();

    res.send(pin);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /pins/{id}:
 *   get:
 *     summary: Get the pin by id
 *     tags: [Pins]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The pin id
 *     responses:
 *       200:
 *         description: The pin description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pin'
 *       404:
 *         description: The pin was not found
 */

router.get("/:id", (req, res) => {
  const pin = req.app.db.get("pins").find({ _id: req.params.id }).value();

  if (!pin) {
    res.sendStatus(404);
  }

  res.send(pin);
});

export default router;
