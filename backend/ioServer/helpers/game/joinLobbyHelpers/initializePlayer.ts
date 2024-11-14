import { lobbies } from "../../../types";

export const initializePlayer = (lobbyId: string, playerId: string) => {
  if (!lobbies[lobbyId].players[playerId]) {
    lobbies[lobbyId].players[playerId] = {
      guessedLetters: [],
      remainingAttempts: 6,
    };
  }
};
