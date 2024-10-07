import request from "supertest";
import { startServer } from "../../backend/server.ts";
import http from "http";
import { User } from "../../models/User.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

let server: http.Server;

describe("User authentication and registration API", () => {
  beforeAll(async () => {
    server = await startServer();
  }, 30000);

  afterAll(async () => {
    await mongoose.disconnect();
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      console.log("Server closed.");
    }
  });

  describe("User registration tests", () => {
    it("should create a new user", async () => {
      const response = await request(server)
        .post("/api/registration/register")
        .send({
          username: "testusername",
          email: "test@example.com",
          password: "123!PASSword",
        });

      const createdUser = await User.findOne({
        username: "testusername",
        email: "test@example.com",
      });

      expect(createdUser?.email).toBe("test@example.com");
      expect(response.status).toBe(201);
      expect(response.body).toBe("User registered successfully");

      await User.deleteOne({
        username: "testusername",
        email: "test@example.com",
      });
    });
  });

  describe("User authentication tests", () => {
    beforeAll(async () => {
      const hashedPassword = await bcrypt.hash("123!PASSword", 10);
      await User.create({
        username: "testusername",
        email: "test@example.com",
        password: hashedPassword,
      });
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
    });

    afterAll(async () => {
      await User.deleteOne({
        username: "testusername",
        email: "test@example.com",
      });
    });
  });
});
