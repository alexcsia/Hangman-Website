import { Lobby } from "../../models/Lobby";
import mongoose from "mongoose";
import { isUserInLobby } from "../utils/isUserInLobby";
import { ApiError } from "../../../errors/ApiError";

export const addPlayerToLobby = async (
  lobbyId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId
) => {
  const userInOtherLobby = await isUserInLobby(userId);
  if (userInOtherLobby) {
    throw new ApiError(400, "User is already part of a lobby");
  }

  try {
    const updatedLobby = await Lobby.findByIdAndUpdate(
      lobbyId,
      { $push: { players: userId } },
      { new: true }
    );

    if (!updatedLobby) {
      throw new ApiError(404, "Lobby not found");
    }
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      500,
      error instanceof Error ? error.message : "Could not add user to the lobby"
    );
  }
};
