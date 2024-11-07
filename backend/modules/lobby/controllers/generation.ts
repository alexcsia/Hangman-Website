import { Request, Response } from "express";
import { createLobby } from "../services/createLobby.ts";
import { IAuthenticatedRequest } from "../../../routes/middleware/authenticateJWT.ts";
import mongoose from "mongoose";

export const generateCodeAndLobby = async (
  req: IAuthenticatedRequest,
  res: Response
) => {
  try {
    const userIdFromToken = req.user?.id;
    if (!userIdFromToken) {
      throw new Error("User ID is missing");
    }

    const userIdObject = new mongoose.Types.ObjectId(userIdFromToken);
    const lobby = await createLobby(userIdObject);
    if (!lobby) {
      throw new Error("Could not create the lobby");
    }

    return res.json({ redirectUrl: `/play/${lobby._id}?code=${lobby.code}` });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error creating lobby:", error.message);
      return res
        .status(500)
        .json({ message: "Something went wrong... Please try again" });
    }
  }
};
