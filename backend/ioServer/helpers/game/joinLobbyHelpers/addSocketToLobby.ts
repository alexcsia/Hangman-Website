import { lobbies } from "../../../types";
import { selectRandomWord } from "../selectRandomWord";

export const addSocketToLobby = async (lobbyId: string) => {
  if (!lobbies[lobbyId]) {
    const randomWord = (await selectRandomWord()) || "example";
    lobbies[lobbyId] = {
      word: randomWord,
      players: {},
    };
  }
};
