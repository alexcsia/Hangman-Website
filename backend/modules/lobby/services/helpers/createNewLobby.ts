import { Lobby } from "../../../models/Lobby";
import mongoose from "mongoose";

export const createNewLobby = async (
  userId: mongoose.Types.ObjectId,
  inviteCode: string
) => {
  return await Lobby.create({
    players: [userId],
    status: "ongoing",
    code: inviteCode,
  });
};
