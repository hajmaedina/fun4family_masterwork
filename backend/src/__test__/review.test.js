import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import Review from "../models/Review";
import testdb from "./test_db";

beforeEach(async () => {
  testdb();
});

afterEach(async () => {
  await Review.deleteMany();
  await mongoose.connection.close();
});

describe("Test Reviews", () => {
  it("GET /reviews should response with 200", async () => {
    const review = {
      username: "Joe",
      review: "Nagyon kedveljük az appot! Már sok szép helyen jártunk a segítségével!",
    };

    await request(app)
      .get("/api/reviews")
      .send(review)
      .expect(200)
      .then((response) => {
        expect(response.body).toBeTruthy();
      });
  });
});