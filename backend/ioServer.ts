import next from "next";
import http from "http";
import { Server } from "socket.io";

interface PlayerState {
  guessedLetters: string[];
  remainingAttempts: number;
}

interface GameState {
  word: string;
  players: Record<string, PlayerState>;
}

const lobbies: Record<string, GameState> = {};

export const handleIoEvents = (httpServer: http.Server) => {
  try {
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
      socket.on("joinLobby", ({ lobbyId, playerId }) => {
        socket.join(lobbyId);
        console.log(`Player ${playerId} joined lobby: ${lobbyId}`);

        if (!lobbies[lobbyId]) {
          const randomWord = "example";
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

        // if (!lobbies[lobbyId]) {
        //   newLobbyAndPlayerState(lobbyId, playerId);
        // }

        // emit the initial game state to each player
        const playerState = lobbies[lobbyId].players[playerId];
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
            return;
          }

          const allPlayersLost = Object.values(lobby.players).every(
            (player) => player.remainingAttempts === 0
          );

          if (allPlayersLost) {
            io.to(lobbyId).emit("gameOver", "Game over! Both players lost.");
          }
        }
      });

      socket.on("rematch", ({ lobbyId, playerId }) => {
        // newLobbyAndPlayerState(lobbyId, playerId);
        const randomWord = "word";
        lobbies[lobbyId] = {
          word: randomWord,
          players: {},
        };

        lobbies[lobbyId].players[playerId] = {
          guessedLetters: [],
          remainingAttempts: 6,
        };

        const playerState = lobbies[lobbyId].players[playerId];
        socket.emit("gameUpdate", {
          word: lobbies[lobbyId].word,
          wordLength: lobbies[lobbyId].word.length,
          playerState: playerState,
        });
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
