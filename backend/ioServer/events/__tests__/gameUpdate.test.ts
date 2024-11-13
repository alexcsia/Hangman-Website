import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { io as Client, Socket as ClientSocket } from "socket.io-client";
import { emitGameUpdate } from "../game/gameUpdate";
import { GameState } from "../../types";

describe("emitGameUpdate function", () => {
  let io: Server;
  let serverSocket: Socket;
  let clientSocket: ClientSocket;
  let lobbyId: string;
  let playerId: string;
  let lobbies: Record<string, GameState>;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = (httpServer.address() as any).port;
      clientSocket = Client(`http://localhost:${port}`);
      io.on("connection", (socket: Socket) => {
        serverSocket = socket;
        lobbyId = "testLobby";
        playerId = "testPlayer";

        lobbies = {
          [lobbyId]: {
            word: "hangman",
            players: {
              [playerId]: {
                remainingAttempts: 5,
                guessedLetters: ["h", "a", "n", "g"],
              },
            },
          },
        };

        socket.join(lobbyId);
        done();
      });
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  it("should emit a game update to the specified lobby with player state", (done) => {
    clientSocket.on("gameUpdate", (data) => {
      try {
        expect(data).toEqual({
          word: "hangman",
          wordLength: 7,
          playerState: {
            remainingAttempts: 5,
            guessedLetters: ["h", "a", "n", "g"],
          },
        });
        done();
      } catch (error) {
        done(error);
      }
    });

    emitGameUpdate(serverSocket, lobbyId, playerId, lobbies);
  });
});
