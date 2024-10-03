import { User } from "../model.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const loginUser = async (password: string, email: string) => {
  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    console.log("password doesnt match");

    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "2h",
  });

  return token;
};
