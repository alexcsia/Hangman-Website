import { Server } from "socket.io";
import { emitGameUpdate } from "./gameUpdate";
import { lobbies } from "../../types";
import { selectRandomWord } from "../../helpers/game/selectRandomWord";

export const handleJoinLobby = async (
  socket: any,
  lobbyId: string,
  playerId: string,
  io: Server
) => {
  socket.join(lobbyId);
  console.log(`Player ${playerId} joined lobby: ${lobbyId}`);

  if (!lobbies[lobbyId]) {
    const randomWord = (await selectRandomWord()) || "word";
    lobbies[lobbyId] = {
      word: randomWord,
      players: {},
    };
  }

  if (!lobbies[lobbyId].players[playerId]) {
    lobbies[lobbyId].players[playerId] = {
      guessedLetters: [],
      remainingAttempts: 6,
    };
  }

  emitGameUpdate(socket, lobbyId, playerId, lobbies);
};
