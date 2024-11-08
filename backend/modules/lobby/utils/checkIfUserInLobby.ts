import { Lobby } from "../../models/Lobby.ts";
import mongoose from "mongoose";

export const isUserInLobby = async (
  userId: mongoose.Types.ObjectId
) => {
  const userInOtherLobby = await Lobby.findOne({
    status: "ongoing",
    players: { $in: [userId] },
  });

  return userInOtherLobby;
};
