import { Lobby } from "../../models/Lobby";
import mongoose from "mongoose";
import { generateInviteCode } from "./helpers/generateInviteCode";
import { isUserInLobby } from "../utils/isUserInLobby";
import { ApiError } from "../../../errors/ApiError";

export const createLobby = async (userId: mongoose.Types.ObjectId) => {
  try {
    const userInOtherLobby = await isUserInLobby(userId);
    if (userInOtherLobby) {
      throw new ApiError(400, "User is already part of a lobby");
    }

    const inviteCode = await generateInviteCode();

    const lobby = await Lobby.create({
      players: [userId],
      status: "ongoing",
      code: inviteCode,
    });

    return lobby;
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      500,
      error instanceof Error ? error.message : "Could not create the lobby"
    );
  }
};
