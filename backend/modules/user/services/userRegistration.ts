import { User } from "../../models/User.ts";
import { hashPassword } from "../utils/passwordUtils/hashPassword.ts";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../utils/validators/index.ts";

export const addUser = async (
  username: string,
  email: string,
  password: string
) => {
  const validatedUsername = validateUsername(username);
  const validatedEmail = await validateEmail(email);
  const validatedPassword = validatePassword(password);

  try {
    const hashedPassword = await hashPassword(validatedPassword);

    const newUser = new User({
      username: validatedUsername,
      email: validatedEmail,
      password: hashedPassword,
      winNum: 0,
    });
    await newUser.save();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Could not save user");
    }
  }
};
