import { ApiError } from "../../../../errors/ApiError";
import mongoose from "mongoose";

export const validateUserId = (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }
};
