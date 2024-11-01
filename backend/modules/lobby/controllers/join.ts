import { Request, Response } from "express";
import { searchForLobby } from "../services/searchForLobby.ts";
import { IAuthenticatedRequest } from "../../../loaders/middleware/authenticateJWT.ts";
import { addPlayerToLobby } from "../services/addPlayerToLobby.ts";
import mongoose from "mongoose";

export const joinLobby = async (req: IAuthenticatedRequest, res: Response) => {
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

    return res.json({ redirectUrl: `/play/${lobby._id}?code=${lobby.code}` });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error when trying to join lobby:", error.message);
      return res.status(500).json({ message: error.message });
    }
  }
};
