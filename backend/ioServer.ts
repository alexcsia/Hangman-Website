import next from "next";
import http from "http";
import { Server } from "socket.io";

export const handleIoEvents = (httpServer: http.Server) => {
  try {
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
      socket.on("joinLobby", (lobbyId) => {
        socket.join(lobbyId);
        console.log(`A user joined lobby: ${lobbyId}`);
      });

      socket.on("chat message", ({ lobbyId, msg }) => {
        console.log(`message in lobby:${lobbyId} ${msg}`);
        io.to(lobbyId).emit("chat message", { msg });
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
