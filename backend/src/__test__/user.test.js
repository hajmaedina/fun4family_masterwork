import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import User from "../models/User";
import testdb from "./test_db";

beforeEach(async () => {
  testdb();
});

afterEach(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});

const userData = {
  username: "Joe",
  email: "test@mail.com",
  password: "$2a$10$1TBUXVT147xoSfSIgI3cZOXFDJFn7IMP.ZiXgLtAm5OFDYMsWXp/G",
};

describe("Test Users", () => {
  it("POST /login should response with 200", async () => {
    const loginData = {
      username: "Joe",
      password: "234567891",
    };

    await User.create(userData);

    await request(app)
      .post("/api/login")
      .send(loginData)
      .expect(200)
      .then((response) => {
        expect(response.body.token).toBeTruthy();
        userData["id"] = response.body.id;
        userData["token"] = response.body.token;
      });
  });

  it("GET /users/:id should response with 200", async () => {
    await request(app)
      .get(`/api/users/${userData.id}`)
      .set("Authorization", `Bearer ${userData.token}`)
      .expect(200)
      .then((response) => {
        expect(response).toBeTruthy();
      });
  });

  it("POST /register should response with 200", async () => {
    const loginData = {
      username: "Joe",
      email: "test@mail.com",
      password: "234567891",
    };

    await request(app)
      .post("/api/register")
      .send(loginData)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBeTruthy();
      });
  });
});
