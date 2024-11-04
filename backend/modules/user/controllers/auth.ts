import { Request, Response } from "express";
import { loginUser } from "../services/userAuthentication.ts";
import { IAuthenticatedRequest } from "../../../loaders/middleware/authenticateJWT.ts";

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const token = await loginUser(userData.password, userData.email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Login successful" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error authenticating user:", error.message);
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};

export const userLogout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

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
