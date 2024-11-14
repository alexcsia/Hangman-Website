import { ApiError } from "../../../../errors/ApiError";
import { User } from "../../../models/User";

export const fetchUserData = async (userId: string) => {
  const userData = await User.findOne({ _id: userId }).select(
    "email username winNum"
  );

  if (!userData) {
    throw new ApiError(404, "User not found");
  }

  return userData;
};
