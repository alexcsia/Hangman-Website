import { Lobby } from "../../models/Lobby.ts";
import mongoose from "mongoose";
import { checkIfUserAlreadyInLobby } from "../utils/checkIfUserInLobby.ts";

export const addPlayerToLobby = async (
  lobbyId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId
) => {
  const userInOtherLobby = await checkIfUserAlreadyInLobby(userId);
  if (userInOtherLobby) throw new Error("User is already part of a lobby");

  await Lobby.findByIdAndUpdate(
    lobbyId,
    { $push: { players: userId } },
    { new: true }
  );
};
