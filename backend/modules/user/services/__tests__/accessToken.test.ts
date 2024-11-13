import mongoose from "mongoose";
import userService from "../userAuthentication";
import { User } from "../../../models/User";
import { hashPassword } from "../../utils/passwordUtils/hashPassword";
import jwt from "jsonwebtoken";
import { signRefreshJWT } from "../../utils/jwtUtils";

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/hangman";

// Wait for MongoDB connection to be established
const waitForConnection = async () => {
  while (mongoose.connection.readyState !== 1) {
    console.log("Waiting for MongoDB connection...");
    await new Promise((resolve) => setTimeout(resolve, 500)); // wait for 500ms
  }
};

describe("generateAccessToken function", () => {
  let testUserId: string;
  let refreshToken: string;

  beforeAll(async () => {
    try {
      await mongoose.connect(mongoURI);
      await waitForConnection(); // Ensure MongoDB connection is ready
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw new Error("Failed to connect to MongoDB");
    }
  });

  beforeEach(async () => {
    const hashedPassword = await hashPassword("password123");
    const testUser = new User({
      username: "testuser",
      email: "testuser@example.com",
      password: hashedPassword,
      winNum: 0,
    });

    const savedUser = await testUser.save();
    testUserId = (savedUser._id as mongoose.Types.ObjectId).toString();
    refreshToken = signRefreshJWT(savedUser);
  });
  afterEach(async () => {
    await User.findByIdAndDelete(testUserId);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should generate a new access token using a valid refresh token", async () => {
    const newAccessToken = await userService.generateAccessToken(refreshToken);

    expect(newAccessToken).toBeDefined();
    expect(typeof newAccessToken).toBe("string");

    const decodedToken = jwt.verify(newAccessToken!, process.env.JWT_SECRET!);
    expect(decodedToken).toMatchObject({
      email: "testuser@example.com",
      username: "testuser",
    });
  });

  it("should throw an error if refresh token is invalid", async () => {
    await expect(
      userService.generateAccessToken("invalidToken")
    ).rejects.toThrow("jwt malformed");
  });

  it("should throw an error if refresh token is valid but user does not exist", async () => {
    await User.findByIdAndDelete(testUserId);

    await expect(userService.generateAccessToken(refreshToken)).rejects.toThrow(
      "Could not find user"
    );
  });
});
