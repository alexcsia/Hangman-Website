import { Server } from "socket.io";
import { emitGameUpdate } from "./gameUpdate";
import { lobbies } from "../../types";

export const handleJoinLobby = async (
  socket: any,
  lobbyId: string,
  playerId: string,
  io: Server
) => {
  addSocketToLobby(socket, lobbyId, playerId);
  initializeLobby(lobbyId);

  if (!lobbies[lobbyId].players[playerId]) {
    lobbies[lobbyId].players[playerId] = {
      guessedLetters: [],
      remainingAttempts: 6,
    };
  }

  emitGameUpdate(socket, lobbyId, playerId, lobbies);
};

const addSocketToLobby = (socket: any, lobbyId: string, playerId: string) => {
  socket.join(lobbyId);
  console.log(`Player ${playerId} joined lobby: ${lobbyId}`);
};

const initializeLobby = (lobbyId: string) => {
  if (!lobbies[lobbyId]) {
    const randomWord = "example";
    lobbies[lobbyId] = {
      word: randomWord,
      players: {},
    };
  }
};
