import { Response } from "express";

export const setRefreshTokenCookie = (
  res: Response,
  refreshToken: string
): void => {
  if (!refreshToken) {
    throw new Error("Missing refresh token");
  }

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000, //3 days
  });
};
