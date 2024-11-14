import { lobbies } from "../../../types";

export const resetPlayerStates = (lobbyId: string) => {
  Object.keys(lobbies[lobbyId].players).forEach((id) => {
    lobbies[lobbyId].players[id] = {
      guessedLetters: [],
      remainingAttempts: 6,
    };
  });
};
