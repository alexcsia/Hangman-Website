import jwt from "jsonwebtoken";
import isJwtPayloadWithUserData from "./isJWTPayload";
import { ApiError } from "../../../../errors/ApiError";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
if (!REFRESH_TOKEN_SECRET)
  throw new Error("REFRESH_TOKEN_SECRET is not defined");

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    const verifiedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    if (!isJwtPayloadWithUserData(verifiedToken)) {
      throw new ApiError(401, "Invalid token payload");
    }

    return verifiedToken;
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }
};
