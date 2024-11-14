import { lobbies } from "../../../types";

export const updateLobbyWord = (lobbyId: string, word: string) => {
  lobbies[lobbyId].word = word;
};
