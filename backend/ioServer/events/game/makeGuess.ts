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

const makeGuess = (playerState: any, lobby: any, letter: string) => {
  if (!playerState.guessedLetters.includes(letter)) {
    playerState.guessedLetters.push(letter);

    if (!lobby.word.includes(letter)) {
      playerState.remainingAttempts--;
    }
  }
};

const checkWinCondition = (word: string, guessedLetters: string[]): boolean => {
  return word.split("").every((letter) => guessedLetters.includes(letter));
};

const handleGameOver = (
  io: Server,
  lobbyId: string,
  message: string,
  playerId?: string
) => {
  io.to(lobbyId).emit("gameOver", message);
  if (playerId) {
    addWinToUser(playerId).catch(console.log);
  }
};
