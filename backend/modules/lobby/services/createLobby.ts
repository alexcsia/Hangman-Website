import { generateInviteCode } from "./helpers/generateInviteCode";
import { isUserInLobby } from "../utils/isUserInLobby";
import { ApiError } from "../../../errors/ApiError";
import { createNewLobby } from "./helpers/createNewLobby";
import mongoose from "mongoose";

export const createLobby = async (userId: mongoose.Types.ObjectId) => {
  try {
    const userInOtherLobby = await isUserInLobby(userId);
    if (userInOtherLobby) {
      throw new ApiError(400, "User is already part of a lobby");
    }

    const inviteCode = await generateInviteCode();
    return await createNewLobby(userId, inviteCode);
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
