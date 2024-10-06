import request from "supertest";
import { startServer } from "../../backend/server.ts";
import http from "http";
import { User } from "../../backend/model.ts";
import mongoose from "mongoose";

let server: http.Server;

describe("User registration API", () => {
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
