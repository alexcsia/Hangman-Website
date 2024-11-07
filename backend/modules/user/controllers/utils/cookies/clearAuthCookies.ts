import { Response } from "express";

const clearCookie = (res: Response, cookieName: string): void => {
  res.clearCookie(cookieName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export { clearCookie };
