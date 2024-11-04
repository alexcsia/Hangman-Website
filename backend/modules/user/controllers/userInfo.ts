import { Request, Response } from "express";
import { IAuthenticatedRequest } from "../../../loaders/middleware/authenticateJWT.ts";

export const getUserInfo = async (
  req: IAuthenticatedRequest,
  res: Response
) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};
