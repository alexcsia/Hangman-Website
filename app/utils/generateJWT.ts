import jwt from "jsonwebtoken";
import { IUser } from "../backend/models/User.ts";

const JWT_SECRET = process.env.JWT_SECRET || "Secret";
export const generateToken = (userData: IUser) => {
  const payload = {
    id: userData._id,
    email: userData.email,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h",
  });
};
