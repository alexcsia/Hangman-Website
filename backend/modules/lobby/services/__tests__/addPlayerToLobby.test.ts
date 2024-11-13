import { addPlayerToLobby } from "../addPlayerToLobby";
import { Lobby } from "../../../models/Lobby";
import mongoose from "mongoose";
import { User } from "../../../models/User";

let userId: mongoose.Types.ObjectId;
let lobbyId: mongoose.Types.ObjectId;
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/hangman";

describe("createLobby function", () => {
  let userId: mongoose.Types.ObjectId;

  beforeAll(async () => {
    await mongoose.connect(mongoURI);

    const user = new User({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
      winNum: 0,
    });

    const savedUser = await user.save();
    userId = savedUser._id as mongoose.Types.ObjectId;

    const lobby = new Lobby({
      players: [],
      status: "ongoing",
      code: "test123",
    });

    const savedLobby = await lobby.save();
    lobbyId = savedLobby._id as mongoose.Types.ObjectId;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Lobby.deleteMany({});
    await mongoose.disconnect();
  });

  describe("addPlayerToLobby function", () => {
    it("should add a player to the lobby", async () => {
      await addPlayerToLobby(lobbyId, userId);

      const updatedLobby = await Lobby.findById(lobbyId);

      expect(updatedLobby).toBeDefined();
      expect(updatedLobby!.players).toContainEqual(userId);
    });

    it("should handle errors correctly", async () => {
      const invalidLobbyId = new mongoose.Types.ObjectId();
      await expect(addPlayerToLobby(invalidLobbyId, userId)).rejects.toThrow(
        "User is already part of a lobby"
      );
    });
  });
});
