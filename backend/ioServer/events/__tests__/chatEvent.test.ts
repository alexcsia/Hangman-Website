import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { handleChatMessage } from "../chat/chatMessage";
import { io as Client, Socket as ClientSocket } from "socket.io-client";

describe("handleChatMessage", () => {
  let io: Server;
  let serverSocket: Socket;
  let clientSocket: ClientSocket;
  let lobbyId: string;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = (httpServer.address() as any).port;
      clientSocket = Client(`http://localhost:${port}`);

      io.on("connection", (socket) => {
        serverSocket = socket;
        lobbyId = "testLobby";
        socket.join(lobbyId);
        done();
      });
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  it("should emit a chat message to the specified lobby", (done) => {
    const message = "Hello, world!";

    clientSocket.on("chat message", (data) => {
      try {
        expect(data).toEqual({ msg: message });
        done();
      } catch (error) {
        done(error);
      }
    });

    handleChatMessage(serverSocket, message, lobbyId, io);
  });
});
