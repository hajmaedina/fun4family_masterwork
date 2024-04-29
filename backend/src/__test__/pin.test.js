import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import Pin from "../models/Pin";
import jwt from "jsonwebtoken";
import testdb from "./test_db";

beforeEach(async () => {
  testdb();
});

afterAll(async () => {
  await Pin.deleteMany();
  await mongoose.connection.close();
});

const userId = "61023b3022613e002a2fa374";
const authToken = jwt.sign(
  { tokenId: userId },
  process.env.TOKEN_SECRET
);

const pin = {
  username: "Joe",
  place: "Csodák Palotája",
  desc: "Az egész család jól érezte magát! Csak ajánlani tudom!",
  rating: 4,
  lat: 47,
  long: 48,
  createDate: new Date().toString(),
};

describe("Test pins routes", () => {
  it("POST /pins/new should response with 200", async () => {
    await request(app)
      .post("/api/pins/new")
      .set("Authorization", `Bearer ${authToken}`)
      .send(pin)
      .expect(200)
      .then((response) => {
        expect(response).toBeTruthy();
        pin["id"] = response.body.newPin._id;
      });
  });

  it("GET /pins/:id should response with 200", async () => {
    await request(app)
      .get(`/api/pins/${pin.id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toBeTruthy();
      });
  });

  it("GET /pins should response with 200", async () => {
    await request(app)
      .get(`/api/pins`)
      .expect(200)
      .then((response) => {
        expect(response.body).toBeTruthy();
      });
  });
});
