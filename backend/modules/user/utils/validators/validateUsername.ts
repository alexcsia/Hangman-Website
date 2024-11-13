import validator from "validator";
import { ApiError } from "../../../../errors/ApiError";

export const validateUsername = (username: string): string => {
  username = username.trim();
  if (!validator.isLength(username, { min: 1, max: 20 })) {
    throw new ApiError(400, "Username must be between 1 and 20 characters");
  }
  if (!validator.isAlphanumeric(username)) {
    throw new ApiError(400, "Username can only contain letters and numbers");
  }
  return username;
};

export const escapeUsername = (username: string): string => {
  const escapedUsername = validator.escape(username);
  return escapedUsername;
};
