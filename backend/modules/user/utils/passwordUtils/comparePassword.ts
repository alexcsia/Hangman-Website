import bcrypt from "bcryptjs";
import { ApiError } from "../../../../errors/ApiError";
import { IUser } from "../../../models/User";

export const comparePasswords = async (
  password: string,
  user: IUser
): Promise<void> => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }
};
