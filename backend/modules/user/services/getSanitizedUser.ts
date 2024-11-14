import { User } from "../../models/User";
import mongoose from "mongoose";
import { escapeUsername } from "../utils/validators/validateUsername";
import { ApiError } from "../../../errors/ApiError";

const validateUserId = (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }
};

export const getSanitizedUser = async (userId: string) => {
  validateUserId(userId);

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
