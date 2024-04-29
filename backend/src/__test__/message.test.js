import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import Message from "../models/Message";
import testdb from "./test_db";

beforeEach(async () => {
  testdb();
});

afterEach(async () => {
  await Message.deleteMany();
  await mongoose.connection.close();
});

describe("Test Messages", () => {
  it("POST /messages should response with 200", async () => {
    const message = {
      name: "Joe",
      email: "test@mail.com",
      message: "Tisztelt Ügyfélszolgálat! Nagyon kedveljük az appot! Üdv, Joe",
    };

    await request(app)
      .post("/api/messages")
      .send(message)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBeTruthy();
      });
  });
});
