import { User } from "../../models/User.ts";
import { hashPassword } from "../utils/passwordUtils/hashPassword.ts";

export const addUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username: username,
      email: email,
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
