import { Server } from "socket.io";
import { emitGameUpdate } from "./gameUpdate";
import addWinToUser from "../../helpers/game/addWinToUser";
import { lobbies } from "../../types";

export const handleMakeGuess = (
  socket: any,
  lobbyId: string,
  playerId: string,
  letter: string,
  username: string,
  io: Server
) => {
  const lobby = lobbies[lobbyId];
  const playerState = lobby?.players[playerId];

  if (lobby && playerState && playerState.remainingAttempts > 0) {
    if (!playerState.guessedLetters.includes(letter)) {
      playerState.guessedLetters.push(letter);

      if (!lobby.word.includes(letter)) {
        playerState.remainingAttempts--;
      }
    }

    emitGameUpdate(socket, lobbyId, playerId, lobbies);

    const isGameWon = lobby.word
      .split("")
      .every((letter) => playerState.guessedLetters.includes(letter));

    if (isGameWon) {
      io.to(lobbyId).emit("gameOver", `${username} won!`);
      addWinToUser(playerId).catch(console.log);
      return;
    }

    if (playerState.remainingAttempts <= 0) {
      io.to(lobbyId).emit("gameOver", `${username} is out of tries!`);
    }
  }
};
