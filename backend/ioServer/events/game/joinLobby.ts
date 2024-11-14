import { Server } from "socket.io";
import { emitGameUpdate } from "./gameUpdate";
import { lobbies } from "../../types";

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

const joinLobby = (socket: any, lobbyId: string, playerId: string) => {
  socket.join(lobbyId);
  console.log(`Player ${playerId} joined lobby: ${lobbyId}`);
};

const addSocketToLobby = (lobbyId: string) => {
  if (!lobbies[lobbyId]) {
    const randomWord = "example";
    lobbies[lobbyId] = {
      word: randomWord,
      players: {},
    };
  }
};

const initializePlayer = (lobbyId: string, playerId: string) => {
  if (!lobbies[lobbyId].players[playerId]) {
    lobbies[lobbyId].players[playerId] = {
      guessedLetters: [],
      remainingAttempts: 6,
    };
  }
};
