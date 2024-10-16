import { Request, Response } from "express";
import { searchForLobby } from "../services/searchForLobby.ts";
import { IAuthenticatedRequest } from "../../../loaders/middleware/authenticateJWT.ts";
import { addPlayerToLobby } from "../services/addPlayerToLobby.ts";
import mongoose from "mongoose";

export const searchLobby = async (
  req: IAuthenticatedRequest,
  res: Response
) => {
  try {
    const data = req.body;
    const lobby = await searchForLobby(data.lobbyCode);
    if (!lobby) {
      throw new Error("Game not found");
    }

    const userIdFromToken = req.user?.id;
    if (!userIdFromToken)
      throw new Error("Please log in before trying to join a game");

    const userIdObject = new mongoose.Types.ObjectId(userIdFromToken);
    const lobbyIdObject = new mongoose.Types.ObjectId(lobby.id);

    await addPlayerToLobby(lobbyIdObject, userIdObject);

    return res.status(200).json({ lobbyId: lobby._id });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error adding player to lobby:", error.message);
      return res
        .status(500)
        .json({ message: "Could not add user to the lobby" });
    }
  }
};
