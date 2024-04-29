import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import Comment from "../models/Comment";
import jwt from "jsonwebtoken";
import testdb from "./test_db";


beforeEach(async () => {
  testdb();
});

afterAll(async () => {
  await Comment.deleteMany();
  await mongoose.connection.close();
});

const userId = "61023b3022613e002a2fa374";
const authToken = jwt.sign(
  { tokenId: userId },
  process.env.TOKEN_SECRET
);

const comment = {
  username: "Joe",
  desc: "Az egész család jól érezte magát! Csak ajánlani tudom!",
  rating: 4,
  pinId: "9875nfu8z8at834nkf87jdio1-9h7",
};

const updatedComment = {
  username: "Joe",
  desc: "Inkább valami mást írok!",
};

describe("Test Comments", () => {
  it("POST /comments/new should response with 200", async () => {
    await request(app)
      .post("/api/comments/new")
      .set("Authorization", `Bearer ${authToken}`)
      .send(comment)
      .expect(200)
      .then((response) => {
        expect(response).toBeTruthy();
        comment["id"] = response.body.newComment._id;
      });
  });

  it("PUT /comments/:id should response with 200", async () => {
    await request(app)
      .put(`/api/comments/${comment.id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(updatedComment)
      .expect(200)
      .then((response) => {
        expect(response.body).toBeTruthy();
      });
  });

  it("GET /comments should response with 200", async () => {
    await request(app)
      .get(`/api/comments`)
      .expect(200)
      .then((response) => {
        expect(response.body).toBeTruthy();
      });
  });

  it("DELETE /comments/:id should response with 200", async () => {
    await request(app)
      .delete(`/api/comments/${comment.id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toBeTruthy();
      });
  });
});
