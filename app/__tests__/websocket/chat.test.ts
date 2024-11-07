import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { io, Socket } from "socket.io-client";
import { handleIoEvents } from "../../../backend/ioServer/ioServer";

describe("websocket chat", () => {
  let httpServer: ReturnType<typeof createServer>;
  let ioServer: SocketIOServer;
  let client1: Socket;
  let client2: Socket;
  const lobbyId = "testLobby";
  const messageFromUser1 = "Hello from user1!";
  const messageFromUser2 = "Hello from user2!";

  beforeAll((done) => {
    httpServer = createServer();
    ioServer = new SocketIOServer(httpServer);
    handleIoEvents(httpServer);

    httpServer.listen(() => {
      const { port } = httpServer.address() as { port: number };
      client1 = io(`http://localhost:${port}`);
      client2 = io(`http://localhost:${port}`);

      client1.on("connect", done);
    });
  });

  afterAll((done) => {
    client1.disconnect();
    client2.disconnect();
    ioServer.close();
    httpServer.close(done);
  }, 10000);

  test("users should be able to chat", (done) => {
    client1.emit("joinLobby", lobbyId);
    client2.emit("joinLobby", lobbyId);

    let receivedMessages = 0;

    client1.on("chat message", ({ msg }: { msg: string }) => {
      console.log(`Client 1 received: ${msg}`);
      expect([messageFromUser1, messageFromUser2]).toContain(msg);

      receivedMessages++;
      if (receivedMessages === 2) done();
    });

    client2.on("chat message", ({ msg }: { msg: string }) => {
      console.log(`Client 2 received: ${msg}`);
      expect([messageFromUser1, messageFromUser2]).toContain(msg);

      receivedMessages++;
      if (receivedMessages === 2) done();
    });

    client1.emit("chat message", {
      lobbyId,
      msg: messageFromUser1,
    });

    client2.emit("chat message", {
      lobbyId,
      msg: messageFromUser2,
    });
  });
});
