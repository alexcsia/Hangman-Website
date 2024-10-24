import next from "next";
import http from "http";
import { Server } from "socket.io";

// Game state per lobby
interface PlayerState {
  guessedLetters: string[];
  remainingAttempts: number;
}

interface GameState {
  word: string;
  players: Record<string, PlayerState>;
}

const lobbies: Record<string, GameState> = {}; // Store game state per lobby

export const handleIoEvents = (httpServer: http.Server) => {
  try {
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
      socket.on("joinLobby", ({ lobbyId, playerId }) => {
        socket.join(lobbyId);
        console.log(`Player ${playerId} joined lobby: ${lobbyId}`);

        // Initialize lobby if it doesn't exist
        if (!lobbies[lobbyId]) {
          const randomWord = "example"; // Fetch or generate a random word here
          lobbies[lobbyId] = {
            word: randomWord,
            players: {},
          };
        }

        // Initialize player state if it doesn't exist
        if (!lobbies[lobbyId].players[playerId]) {
          lobbies[lobbyId].players[playerId] = {
            guessedLetters: [],
            remainingAttempts: 6,
          };
        }

        // Emit the initial game state to the player
        const playerState = lobbies[lobbyId].players[playerId];
        socket.emit("gameUpdate", {
          word: lobbies[lobbyId].word,
          wordLength: lobbies[lobbyId].word.length,
          playerState: playerState,
        });

        socket.on("chat message", ({ msg }) => {
          console.log(`message in lobby ${lobbyId} : ${msg} `);
          io.to(lobbyId).emit("chat message", { msg });
        });

        socket.on("makeGuess", ({ lobbyId, playerId, letter }) => {
          const lobby = lobbies[lobbyId];
          const playerState = lobby?.players[playerId];

          if (lobby && playerState && playerState.remainingAttempts > 0) {
            if (!playerState.guessedLetters.includes(letter)) {
              playerState.guessedLetters.push(letter);

              // Check if the letter is in the word
              if (!lobby.word.includes(letter)) {
                playerState.remainingAttempts--;
              }
            }

            // Emit updated game state to all players in the lobby
            socket.emit("gameUpdate", {
              word: lobby.word,
              wordLength: lobby.word.length,
              playerState: playerState,
            });

            // Check for win condition
            const isGameWon = lobby.word
              .split("")
              .every((letter) => playerState.guessedLetters.includes(letter));

            if (isGameWon) {
              io.to(lobbyId).emit("gameOver", `Player ${playerId} won!`);
              return;
            }

            // Check for game over condition
            const allPlayersLost = Object.values(lobby.players).every(
              (player) => player.remainingAttempts === 0
            );

            if (allPlayersLost) {
              io.to(lobbyId).emit("gameOver", "Game over! Both players lost.");
            }
          }
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
