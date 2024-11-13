import mongoose from "mongoose";
import { User } from "../../../models/User";
import { getSanitizedUser } from "../getSanitizedUser";

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/hangman";

describe("getSanitizedUser function (integration test)", () => {
  let testUserId: string;

  beforeAll(async () => {
    await mongoose.connect(mongoURI);
  });

  beforeEach(async () => {
    const testUser = new User({
      username: "testuser",
      email: "testuser@example.com",
      password: "hashedpassword",
      winNum: 5,
    });

    const savedUser = (await testUser.save()) as mongoose.Document & {
      _id: mongoose.Types.ObjectId;
    };

    testUserId = savedUser._id.toString();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should return a sanitized user object", async () => {
    const sanitizedUser = await getSanitizedUser(testUserId);

    expect(sanitizedUser).toBeDefined();
    expect(sanitizedUser).toMatchObject({
      email: "testuser@example.com",
      username: "testuser",
      winNum: 5,
    });
  });

  it("should throw an error if the user ID is invalid", async () => {
    await expect(getSanitizedUser("invalidUserId")).rejects.toThrow(
      "Invalid user ID"
    );
  });

  it("should throw an error if the user is not found", async () => {
    const nonExistentUserId = new mongoose.Types.ObjectId().toString();
    await expect(getSanitizedUser(nonExistentUserId)).rejects.toThrow(
      "User not found"
    );
  });
});
