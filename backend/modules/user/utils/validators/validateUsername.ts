import validator from "validator";

export const validateUsername = (username: string): string => {
  username = username.trim();
  if (!validator.isLength(username, { min: 1, max: 20 })) {
    throw new Error("Username must be between 1 and 20 characters");
  }
  if (!validator.isAlphanumeric(username)) {
    throw new Error("Username can only contain letters and numbers");
  }
  return username;
};
