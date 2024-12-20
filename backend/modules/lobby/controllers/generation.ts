import { Request, Response } from "express";
import { createLobby } from "../services/createLobby";
import { IAuthenticatedRequest } from "../../types/IAuthenticatedRequest";
import { convertToObjectId } from "../utils/convertToObjectId";
import { ApiError } from "../../../errors/ApiError";

/**
 * Controller function to generate a new game lobby and provide a redirect URL
 *
 * This function attempts to create a new game lobby for the authenticated user by utilizing their user ID from the token
 * If the user ID is missing or if an error occurs during lobby creation, an error is thrown and a 500 response with an
 * error message is returned. Upon successful lobby creation, a JSON response with a redirect URL containing the
 * lobby ID and a unique code is sent, redirecting the user to the newly created game lobby
 *
 * @param req - The incoming request object containing the authenticated user's ID in req.user
 * @param res - The response object used to send the redirect URL or an error message
 * @returns A JSON response containing the redirect URL or an error message if something goes wrong
 */
export const generateCodeAndLobby = async (
  req: IAuthenticatedRequest,
  res: Response
) => {
  try {
    const userIdFromToken = req.user?.id;

    if (!userIdFromToken) {
      throw new ApiError(400, "User ID is required.");
    }

    const userIdObject = convertToObjectId(userIdFromToken);

    const lobby = await createLobby(userIdObject);
    if (!lobby) {
      throw new ApiError(500, "Could not create the lobby");
    }

    return res.json({ redirectUrl: `/play/${lobby._id}?code=${lobby.code}` });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return res.status(error.status).json({ message: error.message });
    }

    console.log("Error creating lobby:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong... Please try again" });
  }
};
