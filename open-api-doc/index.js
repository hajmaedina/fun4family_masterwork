import express from "express";
import cors from "cors";
import morgan from "morgan";
import low from "lowdb";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import loginRouter from "./routes/login.js";
import registerRouter from "./routes/register.js";
import usersRouter from "./routes/users.js";
import commentsRouter from "./routes/comments.js";
import pinsRouter from "./routes/pins.js";
import messagesRouter from "./routes/messages.js";
import reviewsRouter from "./routes/reviews.js";

const PORT = process.env.PORT || 5500;

import FileSync from "lowdb/adapters/FileSync.js";

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ users: [], pins: [], comments: [], messages: [], reviews: [] }).write();

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Fun4Family API",
			version: "1.0.0",
			description: "Travel application that will help to share and find places for family activities",
			author: {
				name: "Hajma-Koródi Edina"
			}
		},
		servers: [
			{
				url: "http://localhost:5500",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.db = db;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/pins", pinsRouter);
app.use("/comments", commentsRouter);
app.use("/messages", messagesRouter);
app.use("/reviews", reviewsRouter);

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));