import http from "http";
import { Server } from "socket.io";
import {
  handleJoinLobby,
  handleMakeGuess,
  handleRematch,
  handleQuit,
} from "./events/game/index.ts";
import { handleChatMessage } from "./events/chat/chatMessage.ts";

import { GameState } from "./types";

const lobbies: Record<string, GameState> = {};

export const handleIoEvents = (httpServer: http.Server) => {
  try {
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
      socket.on("joinLobby", async ({ lobbyId, playerId }) =>
        handleJoinLobby(socket, lobbyId, playerId, io)
      );

      socket.on("chat message", ({ msg, lobbyId }) => {
        handleChatMessage(socket, msg, lobbyId, io);
      });

      socket.on("makeGuess", ({ lobbyId, playerId, letter, username }) => {
        handleMakeGuess(socket, lobbyId, playerId, letter, username, io);
      });

      socket.on("rematch", async ({ lobbyId, playerId }) => {
        handleRematch(socket, lobbyId, playerId, io);
      });

      socket.on("quit", ({ lobbyId, playerId }) => {
        handleQuit(socket, lobbyId, playerId, io, lobbies);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  } catch (error) {
    console.error(
      "Error handling IO events:",
      error instanceof Error ? error.message : "Unknown error"
    );
  }
};
