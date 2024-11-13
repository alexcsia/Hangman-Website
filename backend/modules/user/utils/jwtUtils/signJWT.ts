import { IUser } from "../../../models/User";
import jwt from "jsonwebtoken";
import { ApiError } from "../../../../errors/ApiError";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

if (!REFRESH_TOKEN_SECRET) {
  throw new Error("REFRESH_TOKEN_SECRET is not defined");
}

export const signAccessJWT = (user: IUser): string => {
  try {
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );
    return accessToken;
  } catch (error) {
    throw new ApiError(500, "Failed to sign access token");
  }
};

export const signRefreshJWT = (user: IUser): string => {
  try {
    const refreshToken = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "3d" }
    );
    return refreshToken;
  } catch (error) {
    throw new ApiError(500, "Failed to sign refresh token");
  }
};
