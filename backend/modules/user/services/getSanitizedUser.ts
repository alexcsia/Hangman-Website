import mongoose from "mongoose";
import { escapeUsername } from "../utils/validators/validateUsername";
import { fetchUserData } from "../utils/userQueries/fetchUserById";
import { validateUserId } from "../utils/validators/validateUserId";
import { ApiError } from "../../../errors/ApiError";

export const getSanitizedUser = async (userId: string) => {
  validateUserId(userId);

  try {
    const userData = await fetchUserData(userId);

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
