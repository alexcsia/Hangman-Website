import { Server } from "socket.io";
import { selectRandomWord } from "../../helpers/selectRandomWord.ts";
import { lobbies, rematchCounts } from "../../types.ts";

export const handleRematch = async (
  socket: any,
  lobbyId: string,
  playerId: string,
  io: Server
) => {
  if (!rematchCounts[lobbyId]) {
    rematchCounts[lobbyId] = new Set();
  }

  rematchCounts[lobbyId].add(playerId);

  if (rematchCounts[lobbyId].size === 2) {
    const randomWord = (await selectRandomWord()) || "word";
    lobbies[lobbyId].word = randomWord;

    Object.keys(lobbies[lobbyId].players).forEach((id) => {
      lobbies[lobbyId].players[id] = {
        guessedLetters: [],
        remainingAttempts: 6,
      };
    });

    delete rematchCounts[lobbyId];

    io.to(lobbyId).emit("gameUpdate", {
      word: randomWord,
      wordLength: randomWord.length,
      playerState: lobbies[lobbyId].players[playerId],
    });
  }
};
