import bcrypt from "bcryptjs";
import { ApiError } from "../../../../errors/ApiError";

export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(500, "Failed to hash password");
    }
  }
};
