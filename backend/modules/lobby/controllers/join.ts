import { Request, Response } from "express";
import { searchForLobby } from "./helpers/searchForLobby";
import { IAuthenticatedRequest } from "../../types/IAuthenticatedRequest";
import { addPlayerToLobby } from "../services/addPlayerToLobby";
import mongoose from "mongoose";

/**
 * Controller function to allow a user to join an existing game lobby
 *
 * This function first checks if a game lobby exists by the provided lobby code. If the lobby is found, it ensures the user
 * is authenticated by checking the user ID from the token. If either the lobby is not found or the user is not authenticated,
 * an error is thrown and a 500 response with an error message is returned. Upon successful joining, the user is added
 * to the lobby and a JSON response containing the redirect URL to the game is sent
 *
 * @param req - The incoming request object containing the authenticated user's information and the lobby code
 * @param res - The response object used to send the redirect URL or an error message
 * @returns A JSON response containing the redirect URL to the game or an error message if something goes wrong
 */

export const joinLobby = async (req: IAuthenticatedRequest, res: Response) => {
  try {
    const data = req.body;
    const lobby = await searchForLobby(data.lobbyCode);
    if (!lobby) {
      throw new Error("Game not found");
    }

    const userIdFromToken = req.user?.id;

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
