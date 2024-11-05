import http from "http";
import { Server } from "socket.io";
import addWinToUser from "./modules/user/services/addWinToUser.ts";
import updateLobbyStatus from "./modules/lobby/services/updateLobbyStatus.ts";
import { selectRandomWord } from "./modules/lobby/services/selectRandomWord.ts";

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

export const handleIoEvents = (httpServer: http.Server) => {
  try {
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
      socket.on("joinLobby", async ({ lobbyId, playerId }) => {
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

        // emit the initial game state to each player
        const playerState = lobbies[lobbyId].players[playerId];
        console.log(playerState);
        socket.emit("gameUpdate", {
          word: lobbies[lobbyId].word,
          wordLength: lobbies[lobbyId].word.length,
          playerState: playerState,
        });
      });

      socket.on("chat message", ({ msg, lobbyId }) => {
        console.log(`message in lobby ${lobbyId} : ${msg} `);
        io.to(lobbyId).emit("chat message", { msg });
      });

      socket.on("makeGuess", ({ lobbyId, playerId, letter, username }) => {
        const lobby = lobbies[lobbyId];
        const playerState = lobby?.players[playerId];

        if (lobby && playerState && playerState.remainingAttempts > 0) {
          if (!playerState.guessedLetters.includes(letter)) {
            playerState.guessedLetters.push(letter);

            if (!lobby.word.includes(letter)) {
              playerState.remainingAttempts--;
            }
          }

          socket.emit("gameUpdate", {
            word: lobby.word,
            wordLength: lobby.word.length,
            playerState: playerState,
          });

          const isGameWon = lobby.word
            .split("")
            .every((letter) => playerState.guessedLetters.includes(letter));

          if (isGameWon) {
            io.to(lobbyId).emit("gameOver", ` ${username} won!`);
            addWinToUser(playerId).catch((error) => console.log(error));
            return;
          }

          if (playerState.remainingAttempts <= 0) {
            io.to(lobbyId).emit("gameOver", `${username} is out of tries!`);
          }
        }
      });

      socket.on("rematch", async ({ lobbyId, playerId }) => {
        if (!rematchCounts[lobbyId]) {
          rematchCounts[lobbyId] = new Set();
        }

        rematchCounts[lobbyId].add(playerId);

        if (rematchCounts[lobbyId].size === 2) {
          const randomWord = (await selectRandomWord()) || "word";
          lobbies[lobbyId].word = randomWord;

          const playerState = (lobbies[lobbyId].players[playerId] = {
            guessedLetters: [],
            remainingAttempts: 6,
          });

          delete rematchCounts[lobbyId];

          io.to(lobbyId).emit("gameUpdate", {
            word: randomWord,
            wordLength: randomWord.length,
            playerState: playerState,
          });
        }
      });

      socket.on("quit", ({ lobbyId, playerId }) => {
        console.log(`User ${playerId} is quitting lobby ${lobbyId}`);
        updateLobbyStatus(lobbyId);
        io.to(lobbyId).emit("matchQuit");
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return error.message;
    }
  }
};
