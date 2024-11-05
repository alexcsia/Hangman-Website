import { Request, Response } from "express";
import {
  loginUser,
  generateAccessToken,
} from "../services/userAuthentication.ts";
import { IAuthenticatedRequest } from "../../../loaders/middleware/authenticateJWT.ts";

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const userTokens = await loginUser(userData.password, userData.email);

    res.cookie("accessToken", userTokens?.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", userTokens?.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
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

export const refreshToken = async (
  req: IAuthenticatedRequest,
  res: Response
) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const userId = req.user?.id;
    if (!userId) {
      throw new Error("User ID not defined");
    }

    const newAccessToken = await generateAccessToken(refreshToken, userId);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ message: "Access token refreshed successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error generating new access token:", error.message);
      return res.status(403).json({
        message: "Failed to generate access token",
      });
    }
  }
};

export const userLogout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
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
