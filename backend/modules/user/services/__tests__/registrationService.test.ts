import mongoose from "mongoose";
import { User } from "../../../models/User";
import userService from "../userRegistration";

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/hangman";

describe("addUser function (integration test)", () => {
  beforeAll(async () => {
    await mongoose.connect(mongoURI);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should create and save a new user to the database", async () => {
    const username = "testuser";
    const email = "test@example.com";
    const password = "123!PASSword";

    await userService.addUser(username, email, password);

    const savedUser = await User.findOne({ email });
    expect(savedUser).toBeDefined();
    expect(savedUser?.username).toBe(username);
    expect(savedUser?.email).toBe(email);
    expect(savedUser?.password).not.toBe(password);
    expect(savedUser?.winNum).toBe(0);
  });

  it("should throw an error if trying to save a user with an existing email", async () => {
    const username = "testuser";
    const email = "test@example.com";
    const password = "123!PASSword";

    await userService.addUser(username, email, password);

    await expect(
      userService.addUser(username, email, password)
    ).rejects.toThrow();
  });
});
