import { User } from "../../../models/User";
import { ApiError } from "../../../../errors/ApiError";

interface jwtToken {
  id: string;
  email?: string;
  iat?: number;
  exp?: number;
}
export const getUserFromToken = async (token: jwtToken) => {
  const userId = token.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "Could not find user");
  }
  return user;
};
