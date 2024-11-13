import validator from "validator";
import { getUserByEmail } from "../userQueries/getUserByEmail";
import { ApiError } from "../../../../errors/ApiError";

export const validateEmail = async (email: string): Promise<string> => {
  email = email.trim();
  if (!validator.isLength(email, { min: 5, max: 254 })) {
    throw new ApiError(400, "Email must be between 5 and 254 characters long");
  }
  const normalizedEmail = validator.normalizeEmail(email) || email;
  if (!validator.isEmail(normalizedEmail)) {
    throw new ApiError(400, "Invalid email format");
  }

  const existingUser = await getUserByEmail(normalizedEmail);

  if (existingUser) {
    throw new ApiError(400, "Email is already in use");
  }

  return normalizedEmail;
};
