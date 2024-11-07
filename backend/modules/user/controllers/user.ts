import { Response } from "express";
import { IAuthenticatedRequest } from "../../../loaders/middleware/authenticateJWT.ts";
import { getUserFromDb } from "../services/getUserFromDb.ts";
import { escapeUsername } from "../utils/validators/validateUsername.ts";

export const getUserProfile = async (
  req: IAuthenticatedRequest,
  res: Response
) => {
  const userIdFromParams = req.params.userId;
  const userIdFromToken = req.user?.id;

  if (userIdFromParams !== userIdFromToken) {
    return res
      .status(403)
      .json({ message: "You do not have permission to access this profile." });
  }

  try {
    const userData = await getUserFromDb(userIdFromParams);

    let escapedUsername = "";
    if (userData?.username) {
      escapedUsername = escapeUsername(userData.username);
    }

    return res.status(200).json({
      ...userData,
      escapedUsername,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error retrieving user data:", error.message);
      return res.status(500).json({ message: "Could not retrieve user data" });
    }
  }
};
