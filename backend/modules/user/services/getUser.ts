import { User } from "../../models/User.ts";
import mongoose from "mongoose";
import { escapeUsername } from "../utils/validators/validateUsername.ts";

export const getUser = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }
  try {
    const userData = await User.findOne({ _id: userId }).select(
      "email username winNum"
    );

    if (!userData) {
      throw new Error("User not found");
    }

    return {
      email: userData.email,
      username: userData.username ? escapeUsername(userData.username) : "",
      winNum: userData.winNum,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default {
  getUser,
};
