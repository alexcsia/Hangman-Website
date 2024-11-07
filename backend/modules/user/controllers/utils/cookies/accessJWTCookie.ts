import { Response } from "express";

export const setAccessTokenCookie = (
  res: Response,
  accessToken: string
): void => {
  if (!accessToken) {
    throw new Error("Missing access token");
  }

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
};
