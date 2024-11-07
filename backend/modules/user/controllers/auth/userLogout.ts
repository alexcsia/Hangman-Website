import { Request, Response } from "express";
import { clearCookie } from "../utils/cookies/clearAuthCookies.ts";

export const userLogout = async (req: Request, res: Response) => {
  try {
    clearCookie(res, "accessToken");
    clearCookie(res, "refreshToken");

    return res.status(200).json({ message: "Logout successful" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error logging out:", error.message);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};
