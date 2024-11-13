import request from "supertest";
import { startServer } from "../../../server";
import http from "http";
import { User } from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { generateToken } from "../utils/generateJWT";
import { Lobby } from "../../models/Lobby";
// TODO: fix nanoid import issue

let server: http.Server;

describe("API tests", () => {
  beforeAll(async () => {
    server = await startServer();
  }, 30000);

  afterEach(async () => {
    await User.deleteOne({
      username: "testusername",
      email: "test@example.com",
    });
  });

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

      expect(token).toMatchObject({
        email: "test@example.com",
        username: "testusername",
      });
      expect(response.status).toBe(200);
    });
  });

  describe("Lobby creation test", () => {
    it("should create a new lobby", async () => {
      const hashedPassword = await bcrypt.hash("123!PASSword", 10);
      const user = await User.create({
        username: "testusername",
        email: "test@example.com",
        password: hashedPassword,
      });

      const token = generateToken(user);

      const response = await request(server)
        .get("/api/play/generate")
        .set("Authorization", `Bearer ${token}`);

      const receivedCode = response.body.code;

      const foundLobby = await Lobby.findOne({
        code: receivedCode,
        status: "ongoing",
        players: { $in: [user._id] },
      });
      expect(response.status).toBe(200);
      expect(foundLobby).toBeTruthy;
    });
  });

  describe("Lobby join test", () => {
    it("should allow a user to join an existing lobby", async () => {
      const hashedPassword = await bcrypt.hash("123!PASSword", 10);
      const user = await User.create({
        username: "testusername",
        email: "test@example.com",
        password: hashedPassword,
      });
      const token = generateToken(user);

      const lobbyResponse = await request(server)
        .get("/api/play/generate")
        .set("Authorization", `Bearer ${token}`);

      expect(lobbyResponse.status).toBe(200);
      const { code: lobbyCode, _id: lobbyId } = lobbyResponse.body;

      const joinLobbyResponse = await request(server)
        .post("/api/play/join")
        .set("Authorization", `Bearer ${token}`)
        .send({ lobbyCode });

      expect(joinLobbyResponse.status).toBe(200);
      expect(joinLobbyResponse.body).toHaveProperty("redirectUrl");

      const updatedLobby = await Lobby.findById(lobbyId).populate("players");

      const players = updatedLobby?.players as
        | mongoose.Types.ObjectId[]
        | undefined;

      if (players) {
        const userId = user._id as mongoose.Types.ObjectId;

        expect(players.some((player) => player.equals(userId))).toBe(true);
      } else {
        throw new Error("Players not populated correctly");
      }
    });
  });
});
