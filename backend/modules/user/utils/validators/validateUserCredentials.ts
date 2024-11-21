import { comparePasswords } from "../../utils/passwordUtils/comparePassword";
import { ApiError } from "../../../../errors/ApiError";
import { getUserByEmail } from "../../utils/userQueries/getUserByEmail";

export const validateUserCredentials = async (
  email: string,
  password: string
) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }
    await comparePasswords(password, user);
    return user;
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "An error occurred during login");
  }
};
