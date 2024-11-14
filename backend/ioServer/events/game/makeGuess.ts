import { Server } from "socket.io";
import { emitGameUpdate } from "./gameUpdate";
import { checkWinCondition } from "../../helpers/game/makeGuessHelpers/checkWinCondition";
import { handleGameOver } from "../../helpers/game/makeGuessHelpers/handleGameOver";
import { makeGuess } from "../../helpers/game/makeGuessHelpers/makeGuess";
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
    makeGuess(playerState, lobby, letter);

    emitGameUpdate(socket, lobbyId, playerId, lobbies);

    const isGameWon = checkWinCondition(lobby.word, playerState.guessedLetters);

    if (isGameWon) {
      handleGameOver(io, lobbyId, `${username} won!`, playerId);
      return;
    }

    if (playerState.remainingAttempts <= 0) {
      handleGameOver(io, lobbyId, `${username} is out of tries!`);
    }
  }
};
