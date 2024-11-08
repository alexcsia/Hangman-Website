import http from "http";
import { Server } from "socket.io";
import addWinToUser from "./helpers/addWinToUser.ts";
import updateLobbyStatus from "./helpers/updateLobbyStatus.ts";
import { selectRandomWord } from "./helpers/selectRandomWord.ts";

interface PlayerState {
  guessedLetters: string[];
  remainingAttempts: number;
}

interface GameState {
  word: string;
  players: Record<string, PlayerState>;
}

const lobbies: Record<string, GameState> = {};
const rematchCounts: Record<string, Set<string>> = {};

const emitGameUpdate = (socket: any, lobbyId: string, playerId: string) => {
  const lobby = lobbies[lobbyId];
  const playerState = lobby?.players[playerId];
  socket.emit("gameUpdate", {
    word: lobby?.word,
    wordLength: lobby?.word.length,
    playerState: playerState,
  });
};

const handleJoinLobby = async (
  socket: any,
  lobbyId: string,
  playerId: string,
  io: Server
) => {
  socket.join(lobbyId);
  console.log(`Player ${playerId} joined lobby: ${lobbyId}`);

  if (!lobbies[lobbyId]) {
    const randomWord = (await selectRandomWord()) || "example";
    lobbies[lobbyId] = {
      word: randomWord,
      players: {},
    };
  }

  if (!lobbies[lobbyId].players[playerId]) {
    lobbies[lobbyId].players[playerId] = {
      guessedLetters: [],
      remainingAttempts: 6,
    };
  }

  emitGameUpdate(socket, lobbyId, playerId);
};

const handleMakeGuess = (
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

    emitGameUpdate(socket, lobbyId, playerId);

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

const handleRematch = async (
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

const handleQuit = (
  socket: any,
  lobbyId: string,
  playerId: string,
  io: Server
) => {
  console.log(`User ${playerId} is quitting lobby ${lobbyId}`);
  updateLobbyStatus(lobbyId);
  io.to(lobbyId).emit("matchQuit");
};

export const handleIoEvents = (httpServer: http.Server) => {
  try {
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
      socket.on("joinLobby", async ({ lobbyId, playerId }) =>
        handleJoinLobby(socket, lobbyId, playerId, io)
      );

      socket.on("chat message", ({ msg, lobbyId }) => {
        io.to(lobbyId).emit("chat message", { msg });
      });

      socket.on("makeGuess", ({ lobbyId, playerId, letter, username }) => {
        handleMakeGuess(socket, lobbyId, playerId, letter, username, io);
      });

      socket.on("rematch", async ({ lobbyId, playerId }) => {
        handleRematch(socket, lobbyId, playerId, io);
      });

      socket.on("quit", ({ lobbyId, playerId }) => {
        handleQuit(socket, lobbyId, playerId, io);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  } catch (error) {
    console.error(
      "Error handling IO events:",
      error instanceof Error ? error.message : "Unknown error"
    );
  }
};
