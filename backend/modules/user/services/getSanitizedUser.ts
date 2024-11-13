import { User } from "../../models/User";
import mongoose from "mongoose";
import { escapeUsername } from "../utils/validators/validateUsername";
import { ApiError } from "../../../errors/ApiError";

export const getSanitizedUser = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  try {
    const userData = await User.findOne({ _id: userId }).select(
      "email username winNum"
    );

    if (!userData) {
      throw new ApiError(404, "User not found");
    }

    return {
      email: userData.email,
      username: userData.username ? escapeUsername(userData.username) : "",
      winNum: userData.winNum,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(500, error.message);
    }
  }
};
