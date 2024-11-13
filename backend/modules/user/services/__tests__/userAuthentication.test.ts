import mongoose from "mongoose";
import userService from "../userAuthentication";
import { User } from "../../../models/User";
import { hashPassword } from "../../utils/passwordUtils/hashPassword";
import jwt from "jsonwebtoken";
import { signRefreshJWT } from "../../utils/jwtUtils";

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/hangman";

describe("User Authentication Service (integration test)", () => {
  let testUserId: string;
  let refreshToken: string;

  beforeAll(async () => {
    try {
      await mongoose.connect(mongoURI);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  });

  beforeEach(async () => {
    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB is not connected");
    }

    const hashedPassword = await hashPassword("password123");
    const testUser = new User({
      username: "testuser",
      email: "testuser@example.com",
      password: hashedPassword,
      winNum: 0,
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
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
      throw error;
    }
  });

  describe("loginUser function", () => {
    it("should log in the user and return access and refresh tokens", async () => {
      const result = await userService.loginUser(
        "testuser@example.com",
        "password123"
      );

      expect(result).toBeDefined();
      expect(result).toHaveProperty("accessToken");
      expect(result).toHaveProperty("refreshToken");

      const { accessToken, refreshToken: receivedRefreshToken } = result!;

      refreshToken = receivedRefreshToken;

      expect(accessToken).toBeDefined();
      expect(receivedRefreshToken).toBeDefined();

      const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET!);
      expect(decodedToken).toMatchObject({
        email: "testuser@example.com",
        username: "testuser",
      });
    });
  });

  it("should throw an error with an invalid email or password", async () => {
    await expect(
      userService.loginUser("invalid@example.com", "password123")
    ).rejects.toThrow("Invalid email or password");
    await expect(
      userService.loginUser("testuser@example.com", "wrongpassword")
    ).rejects.toThrow("Invalid email or password");
  });
});
