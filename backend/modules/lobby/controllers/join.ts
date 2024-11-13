import { Request, Response } from "express";
import { searchForLobby } from "./helpers/searchForLobby";
import { IAuthenticatedRequest } from "../../types/IAuthenticatedRequest";
import { addPlayerToLobby } from "../services/addPlayerToLobby";
import { convertToObjectId } from "../utils/convertToObjectId";
import { ApiError } from "../../../errors/ApiError";

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
      throw new ApiError(404, "Game not found");
    }

    const userIdFromToken = req.user?.id;

    if (!userIdFromToken) {
      throw new ApiError(400, "User ID is required.");
    }

    const userIdObject = convertToObjectId(userIdFromToken);
    const lobbyIdObject = convertToObjectId(lobby.id);

    await addPlayerToLobby(lobbyIdObject, userIdObject);

    return res.json({ redirectUrl: `/play/${lobby._id}?code=${lobby.code}` });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return res.status(error.status).json({ message: error.message });
    }

    console.error(
      "Error when trying to join lobby:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};
