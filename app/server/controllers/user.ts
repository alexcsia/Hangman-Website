import { Response } from "express";
import { IAuthenticatedRequest } from "../middleware/authenticateJWT.ts";
import { getUserFromDb } from "../services/getUserFromDb.ts";

export const userProfile = async (
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

  const userData = await getUserFromDb(userIdFromParams);
  console.log("received data:", userData);

  return res.status(200).json(userData);
};
