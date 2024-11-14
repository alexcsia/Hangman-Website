import { Server } from "socket.io";
import { selectRandomWord } from "../../helpers/game/selectRandomWord";
import { lobbies, rematchCounts } from "../../types";

export const handleRematch = async (
  socket: any,
  lobbyId: string,
  playerId: string,
  io: Server
) => {
  registerRematchVote(lobbyId, playerId);

  if (isRematchReady(lobbyId)) {
    await startNewGame(lobbyId, io, playerId);
    clearRematchVotes(lobbyId);
  }
};

// Registers a player's vote to rematch in the given lobby
const registerRematchVote = (lobbyId: string, playerId: string) => {
  if (!rematchCounts[lobbyId]) {
    rematchCounts[lobbyId] = new Set();
  }
  rematchCounts[lobbyId].add(playerId);
};

// Checks if all players in the lobby have voted to rematch
const isRematchReady = (lobbyId: string): boolean => {
  return rematchCounts[lobbyId]?.size === 2;
};

// Starts a new game by selecting a word and resetting the game state
const startNewGame = async (lobbyId: string, io: Server, playerId: string) => {
  const randomWord = (await selectRandomWord()) || "word";
  resetPlayerStates(lobbyId);
  updateLobbyWord(lobbyId, randomWord);

  io.to(lobbyId).emit("gameUpdate", {
    word: randomWord,
    wordLength: randomWord.length,
    playerState: lobbies[lobbyId].players[playerId],
  });
};

// Resets the state of each player in the lobby for a new game
const resetPlayerStates = (lobbyId: string) => {
  Object.keys(lobbies[lobbyId].players).forEach((id) => {
    lobbies[lobbyId].players[id] = {
      guessedLetters: [],
      remainingAttempts: 6,
    };
  });
};

// Updates the lobby with a new word for the game
const updateLobbyWord = (lobbyId: string, word: string) => {
  lobbies[lobbyId].word = word;
};

// Clears rematch votes for the lobby after starting a new game
const clearRematchVotes = (lobbyId: string) => {
  delete rematchCounts[lobbyId];
};
