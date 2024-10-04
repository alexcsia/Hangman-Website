import request from "supertest";
import { startServer } from "../../backend/server.ts";
import http from "http";

let server: http.Server;

describe("User registration API", () => {
  beforeAll(async () => {
    process.env.JWT_SECRET = "your-test-secret";
    server = await startServer(); // Start the server and assign it to 'server'
  }, 10000); // Set timeout specifically for this hook

  afterAll((done) => {
    server.close(done);
  });

  it("should create a new user", async () => {
    const response = await request(server)
      .post("/api/registration/register")
      .send({
        username: "testusername",
        email: "test@example.com",
        password: "123!PASSword",
      });

    console.log(response.status);
    console.log(response.body);

    expect(response.status).toBe(201);
    expect(response.body).toBe("User registered successfully");
  });
});
