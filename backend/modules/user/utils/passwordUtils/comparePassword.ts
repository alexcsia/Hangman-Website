import bcrypt from "bcryptjs";
import { IUser } from "../../../models/User.ts";

export const comparePasswords = async (
  password: string,
  user: IUser
): Promise<void> => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
};
