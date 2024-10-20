import { User } from "../../models/User.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (password: string, email: string) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    return token;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
