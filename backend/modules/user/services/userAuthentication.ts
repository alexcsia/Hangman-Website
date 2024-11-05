import { User } from "../../models/User.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import isJwtPayloadWithUserData from "../utils/CheckIsJWTPayload.ts";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

export const loginUser = async (password: string, email: string) => {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

  if (!REFRESH_TOKEN_SECRET)
    throw new Error("REFRESH_TOKEN_SECRET is not defined");

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "3d" }
    );

    return { accessToken: accessToken, refreshToken: refreshToken };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const generateAccessToken = async (refreshToken: string) => {
  try {
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
    if (!REFRESH_TOKEN_SECRET)
      throw new Error("REFRESH_TOKEN_SECRET is not defined");

    let verifiedToken;
    try {
      verifiedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      if (!isJwtPayloadWithUserData(verifiedToken)) {
        throw new Error("Invalid token payload");
      }
    } catch (error) {
      throw new Error("Refresh token is invalid");
    }

    const userId = verifiedToken.id;
    const user = await User.findById(userId);
    if (!user) throw new Error("Could not find user");

    const accessToken = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    return accessToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
