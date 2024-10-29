import { User, IUser } from "../../models/User.ts";
import bcrypt from "bcryptjs";
import validator from "validator";

export const addUser = async (userData: IUser) => {
  try {
    const validatedUsername = validateUsername(userData.username);
    const validatedEmail = await validateEmail(userData.email);
    const validatedHashedPassword = await validateAndHashPassword(
      userData.password
    );

    const newUser = new User({
      username: validatedUsername,
      email: validatedEmail,
      password: validatedHashedPassword,
    });
    await newUser.save();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Could not save user");
    }
  }
};

const validateUsername = (username: string): string => {
  username = username.trim();
  if (!validator.isLength(username, { min: 1, max: 20 })) {
    throw new Error("Username must be between 1 and 20 characters");
  }
  if (!validator.isAlphanumeric(username)) {
    throw new Error("Username can only contain letters and numbers");
  }
  return username;
};

const validateEmail = async (email: string): Promise<string> => {
  email = email.trim();
  if (!validator.isLength(email, { min: 5, max: 254 })) {
    throw new Error("Email must be between 5 and 254 characters long");
  }
  const normalizedEmail = validator.normalizeEmail(email) || email;
  if (!validator.isEmail(normalizedEmail)) {
    throw new Error("Invalid email format");
  }

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw new Error("Email is already in use");
  }

  return normalizedEmail;
};

const validateAndHashPassword = async (password: string): Promise<string> => {
  if (
    !validator.isStrongPassword(password, {
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw new Error("Password not strong enough");
  }
  if (!validator.isLength(password, { min: 10, max: 64 })) {
    throw new Error("Password cannot exceed 64 characters");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
