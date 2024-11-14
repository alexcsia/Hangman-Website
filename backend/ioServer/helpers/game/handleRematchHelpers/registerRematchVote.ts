import { rematchCounts } from "../../../types";

export const registerRematchVote = (lobbyId: string, playerId: string) => {
  if (!rematchCounts[lobbyId]) {
    rematchCounts[lobbyId] = new Set();
  }
  rematchCounts[lobbyId].add(playerId);
};
