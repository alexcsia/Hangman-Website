import { Lobby } from "../../models/Lobby.ts";
import mongoose from "mongoose";
import { isUserInLobby } from "../utils/checkIfUserInLobby.ts";

export const addPlayerToLobby = async (
  lobbyId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId
) => {
  const userInOtherLobby = await isUserInLobby(userId);
  if (userInOtherLobby) throw new Error("User is already part of a lobby");

  try {
    await Lobby.findByIdAndUpdate(
      lobbyId,
      { $push: { players: userId } },
      { new: true }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Could not add user to the lobby");
    }
  }
};
