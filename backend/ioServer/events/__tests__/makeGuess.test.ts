import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { io as Client, Socket as ClientSocket } from "socket.io-client";
import { handleMakeGuess } from "../game/makeGuess";
import { lobbies } from "../../types";

let io: Server;
let serverSocket: Socket;
let clientSocket1: ClientSocket;
let lobbyId: string;
let playerId1: string;
let playerId2: string;
let username1: string;
let username2: string;

beforeAll(async () => {
  const httpServer = createServer();
  io = new Server(httpServer);

  await new Promise<void>((resolve) => {
    httpServer.listen(() => {
      const port = (httpServer.address() as any).port;
      clientSocket1 = Client(`http://localhost:${port}`);
      clientSocket1.on("connect", resolve);

      io.on("connection", (socket: Socket) => {
        serverSocket = socket;
        lobbyId = "testLobby";
        playerId1 = "player1";
        playerId2 = "player2";
        username1 = "Player 1";
        username2 = "Player 2";

        lobbies[lobbyId] = {
          word: "example",
          players: {
            [playerId1]: { guessedLetters: [], remainingAttempts: 6 },
            [playerId2]: { guessedLetters: [], remainingAttempts: 6 },
          },
        };
      });
    });
  });
});

afterAll(async () => {
  io.close();
  clientSocket1.close();
});

it("should update game state correctly when player guesses the word correctly", async () => {
  handleMakeGuess(serverSocket, lobbyId, playerId1, "e", username1, io);
  handleMakeGuess(serverSocket, lobbyId, playerId1, "x", username1, io);
  handleMakeGuess(serverSocket, lobbyId, playerId1, "a", username1, io);
  handleMakeGuess(serverSocket, lobbyId, playerId1, "m", username1, io);
  handleMakeGuess(serverSocket, lobbyId, playerId1, "p", username1, io);
  handleMakeGuess(serverSocket, lobbyId, playerId1, "l", username1, io);
  handleMakeGuess(serverSocket, lobbyId, playerId1, "e", username1, io);

  const playerState1 = lobbies[lobbyId].players[playerId1];
  expect(playerState1.guessedLetters).toEqual(["e", "x", "a", "m", "p", "l"]);
  expect(playerState1.remainingAttempts).toBe(6);
});

it("should emit gameOver when player runs out of attempts", async () => {
  handleMakeGuess(serverSocket, lobbyId, playerId1, "z", username1, io);
  handleMakeGuess(serverSocket, lobbyId, playerId1, "q", username1, io);
  handleMakeGuess(serverSocket, lobbyId, playerId1, "w", username1, io);
  handleMakeGuess(serverSocket, lobbyId, playerId1, "r", username1, io);
  handleMakeGuess(serverSocket, lobbyId, playerId1, "t", username1, io);
  handleMakeGuess(serverSocket, lobbyId, playerId1, "y", username1, io);

  const playerState1 = lobbies[lobbyId].players[playerId1];
  expect(playerState1.remainingAttempts).toBe(0);
  expect(playerState1.guessedLetters).toContain("z");
  expect(playerState1.guessedLetters).toContain("q");
  expect(playerState1.guessedLetters).toContain("w");
  expect(playerState1.guessedLetters).toContain("r");
  expect(playerState1.guessedLetters).toContain("t");
  expect(playerState1.guessedLetters).toContain("y");
});
