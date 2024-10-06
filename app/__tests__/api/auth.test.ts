import request from "supertest";
import { startServer } from "../../backend/server.ts";
import http from "http";
import { User } from "../../backend/model.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

let server: http.Server;
//try running tests on dynamic ports
describe("User authentication API", () => {
  beforeAll(async () => {
    server = await startServer();
    const hashedPassword = await bcrypt.hash("123!PASSword", 10);
    await User.create({
      username: "testusername",
      email: "test@example.com",
      password: hashedPassword,
    });
  }, 30000);

  afterAll(async () => {
    await mongoose.disconnect();
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      console.log("Server closed.");
    }
  });

  it("should authenticate an existing user", async () => {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const response = await request(server).post("/api/auth/login").send({
      email: "test@example.com",
      password: "123!PASSword",
    });

    const token = jwt.verify(response.body.token, process.env.JWT_SECRET!);

    expect(token).toMatchObject({ email: "test@example.com" });
    expect(response.status).toBe(200);

    await User.deleteOne({
      username: "testusername",
      email: "test@example.com",
    });
  });
});
