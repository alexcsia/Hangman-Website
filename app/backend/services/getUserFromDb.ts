import { User } from "../models/User.ts";
import mongoose from "mongoose";
import validator from "validator";

export const getUserFromDb = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }
  try {
    const userData = await User.findOne({ _id: userId }).select(
      "email username"
    );

    if (!userData) {
      throw new Error("User not found");
    }
    const sanitizedUsername = validator.escape(userData.username);
    return { email: userData.email, username: sanitizedUsername };
  } catch (error) {
    console.error("Error extracting user from db", error);
    throw new Error("Unable to retrieve user data");
  }
};
