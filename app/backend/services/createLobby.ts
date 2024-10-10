import { Lobby } from "../../models/Lobby.ts";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

export const createLobby = async (userId: mongoose.Types.ObjectId) => {
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

const checkIfUserAlreadyInLobby = async (userId: mongoose.Types.ObjectId) => {
  const userInOtherLobby = await Lobby.findOne({
    status: "ongoing",
    players: { $in: [userId] },
  });

  return userInOtherLobby;
};

const addPlayerToLobby = async (
  lobbyId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId
) => {
  await Lobby.findByIdAndUpdate(
    lobbyId,
    { $push: { players: userId } },
    { new: true }
  );
};
