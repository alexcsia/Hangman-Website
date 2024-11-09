import { Lobby } from "../../models/Lobby.ts";
import mongoose from "mongoose";
import { generateInviteCode } from "./helpers/generateInviteCode.ts";
import { isUserInLobby } from "../utils/isUserInLobby.ts";

export const createLobby = async (userId: mongoose.Types.ObjectId) => {
  try {
    const userInOtherLobby = await isUserInLobby(userId);
    if (userInOtherLobby) throw new Error("User is already part of a lobby");

    const inviteCode = await generateInviteCode();

    const lobby = await Lobby.create({
      players: [userId],
      status: "ongoing",
      code: inviteCode,
    });

    return lobby;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
