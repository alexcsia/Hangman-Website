import mongoose from "mongoose";
import { createLobby } from "../createLobby";
import { Lobby } from "../../../models/Lobby";
import { User } from "../../../models/User";
// TODO: fix nanoid import issue
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/hangman";

describe("createLobby function", () => {
  let userId: mongoose.Types.ObjectId;

  beforeAll(async () => {
    await mongoose.connect(mongoURI);
  });

  beforeEach(async () => {
    const user = new User({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
      winNum: 0,
    });

    const savedUser = await user.save();
    userId = savedUser._id as mongoose.Types.ObjectId;
  });

  afterEach(async () => {
    await Lobby.deleteMany({});
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should create a lobby with the given userId", async () => {
    const lobby = await createLobby(userId);

    expect(lobby).toBeDefined();
    expect(lobby?.players).toContainEqual(userId);
    expect(lobby?.status).toBe("ongoing");
    expect(lobby?.code).toBeDefined();
  });

  it("should throw an error if the user is already in a lobby", async () => {
    await createLobby(userId);

    await expect(createLobby(userId)).rejects.toThrow(
      "User is already part of a lobby"
    );
  });
});
