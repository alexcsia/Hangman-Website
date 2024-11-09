import jwt from "jsonwebtoken";
import isJwtPayloadWithUserData from "./isJWTPayload.ts";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
if (!REFRESH_TOKEN_SECRET)
  throw new Error("REFRESH_TOKEN_SECRET is not defined");

export const verifyRefreshToken = (refreshToken: string) => {
  const verifiedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
  if (!isJwtPayloadWithUserData(verifiedToken)) {
    throw new Error("Invalid token payload");
  }

  return verifiedToken;
};
