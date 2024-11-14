import { Server } from "socket.io";
import { selectRandomWord } from "../../../helpers/game/selectRandomWord";
import { resetPlayerStates } from "./resetPlayerStates";
import { updateLobbyWord } from "./updateLobbyWord";
import { lobbies } from "../../../types";

export const startNewGame = async (
  lobbyId: string,
  io: Server,
  playerId: string
) => {
  const randomWord = (await selectRandomWord()) || "word";
  resetPlayerStates(lobbyId);
  updateLobbyWord(lobbyId, randomWord);

  io.to(lobbyId).emit("gameUpdate", {
    word: randomWord,
    wordLength: randomWord.length,
    playerState: lobbies[lobbyId].players[playerId],
  });
};
