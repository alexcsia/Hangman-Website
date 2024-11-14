import { lobbies } from "../../../types";
import { selectRandomWord } from "../selectRandomWord";

export const initializeLobby = async (lobbyId: string) => {
  if (!lobbies[lobbyId]) {
    const randomWord = (await selectRandomWord()) || "example";
    lobbies[lobbyId] = {
      word: randomWord,
      players: {},
    };
  }
};
