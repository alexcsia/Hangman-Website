import { Lobby } from "../../models/Lobby";
import mongoose from "mongoose";

export const isUserInLobby = async (userId: mongoose.Types.ObjectId) => {
  const userInOtherLobby = await Lobby.findOne({
    status: "ongoing",
    players: { $in: [userId] },
  });

  return userInOtherLobby;
};
