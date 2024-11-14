import { lobbies } from "../../../types";

export const addSocketToLobby = (lobbyId: string) => {
  if (!lobbies[lobbyId]) {
    const randomWord = "example";
    lobbies[lobbyId] = {
      word: randomWord,
      players: {},
    };
  }
};
