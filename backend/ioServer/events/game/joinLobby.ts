import { Server } from "socket.io";
import { emitGameUpdate } from "./gameUpdate";
import { lobbies } from "../../types";
import { joinLobby } from "../../helpers/game/joinLobbyHelpers/joinLobby";
import { initializeLobby } from "../../helpers/game/joinLobbyHelpers/initializeLobby";
import { initializePlayer } from "../../helpers/game/joinLobbyHelpers/initializePlayer";

export const handleJoinLobby = async (
  socket: any,
  lobbyId: string,
  playerId: string,
  io: Server
) => {
  joinLobby(socket, lobbyId, playerId);
  initializeLobby(lobbyId);
  initializePlayer(lobbyId, playerId);

  emitGameUpdate(socket, lobbyId, playerId, lobbies);
};
