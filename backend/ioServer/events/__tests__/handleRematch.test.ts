import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { io as Client, Socket as ClientSocket } from "socket.io-client";
import mongoose from "mongoose";
import { handleRematch } from "../game/handleRematch";
import { lobbies } from "../../types";

const MONGO_URI = "mongodb://localhost:27017/testHangman";

describe("handleRematch function", () => {
  let io: Server;
  let serverSocket: Socket;
  let clientSocket1: ClientSocket;
  let clientSocket2: ClientSocket;
  let lobbyId: string;
  let playerId1: string;
  let playerId2: string;

  beforeAll(async () => {
    await mongoose.connect(MONGO_URI);

    const httpServer = createServer();
    io = new Server(httpServer);

    await new Promise<void>((resolve) => {
      httpServer.listen(() => {
        const port = (httpServer.address() as any).port;
        clientSocket1 = Client(`http://localhost:${port}`);
        clientSocket2 = Client(`http://localhost:${port}`);

        io.on("connection", (socket: Socket) => {
          serverSocket = socket;
          lobbyId = "testLobby";
          playerId1 = "player1";
          playerId2 = "player2";

          lobbies[lobbyId] = {
            word: "oldword",
            players: {
              [playerId1]: { guessedLetters: [], remainingAttempts: 6 },
              [playerId2]: { guessedLetters: [], remainingAttempts: 6 },
            },
          };

          socket.join(lobbyId);
          resolve();
        });
      });
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    io.close();
    clientSocket1.close();
    clientSocket2.close();
  });

  it("should update game state and emit gameUpdate when both players opt for a rematch", (done) => {
    clientSocket1.on("gameUpdate", (data) => {
      try {
        expect(data).toHaveProperty("word");
        expect(data.word).not.toBe("oldword");
        expect(data.wordLength).toBeGreaterThan(0);
        expect(data.playerState).toEqual({
          guessedLetters: [],
          remainingAttempts: 6,
        });

        done();
      } catch (error) {
        done(error);
      }
    });

    handleRematch(serverSocket, lobbyId, playerId1, io);
    handleRematch(serverSocket, lobbyId, playerId2, io);
  }, 15000);
});
