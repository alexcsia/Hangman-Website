import { Server } from "socket.io";
import { emitGameUpdate } from "./gameUpdate";
import { lobbies } from "../../types";
import { joinLobby } from "../../helpers/game/joinLobbyHelpers/joinLobby";
import { addSocketToLobby } from "../../helpers/game/joinLobbyHelpers/addSocketToLobby";
import { initializePlayer } from "../../helpers/game/joinLobbyHelpers/initializePlayer";

export const handleJoinLobby = async (
  socket: any,
  lobbyId: string,
  playerId: string,
  io: Server
) => {
  joinLobby(socket, lobbyId, playerId);
  addSocketToLobby(lobbyId);
  initializePlayer(lobbyId, playerId);

  emitGameUpdate(socket, lobbyId, playerId, lobbies);
};
