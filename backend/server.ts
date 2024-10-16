import express from "express";
import next from "next";
import http from "http";
import { Server } from "socket.io";
import { applyRoutes } from "./loaders/routes.ts";
import { setUpMiddleware } from "./loaders/middleware/middleware.ts";
import connectMongoDB from "./loaders/database.ts";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

const startServer = async (): Promise<http.Server> => {
  await app.prepare();

  setUpMiddleware(server);
  applyRoutes(server, handle);

  await connectMongoDB();

  const httpServer = http.createServer(server);

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

  return new Promise((resolve) => {
    httpServer.listen(process.env.PORT, () => {
      console.log(`Ready on http://localhost:${process.env.PORT}`);
      resolve(httpServer);
    });
  });
};

export { startServer };
