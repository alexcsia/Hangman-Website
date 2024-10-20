import { Lobby } from "../../models/Lobby.ts";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { checkIfUserAlreadyInLobby } from "../utils/checkIfUserInLobby.ts";

export const createLobby = async (userId: mongoose.Types.ObjectId) => {
  try {
    const userInOtherLobby = await checkIfUserAlreadyInLobby(userId);
    if (userInOtherLobby) throw new Error("User is already part of a lobby");

    const inviteCode = await generateInviteCode();

    const lobby = await Lobby.create({
      players: [userId],
      status: "ongoing",
      winner: "",
      code: inviteCode,
    });

    return lobby;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const generateInviteCode = async () => {
  const newCode = nanoid(8);
  const existingCode = await Lobby.findOne({
    status: "ongoing",
    code: newCode,
  });

  if (!existingCode) return newCode;
  return generateInviteCode();
};
