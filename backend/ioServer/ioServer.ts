import http from "http";
import { Server } from "socket.io";
import {
  handleJoinLobby,
  handleMakeGuess,
  handleRematch,
  handleQuit,
} from "./events/game/index";
import { handleChatMessage } from "./events/chat/chatMessage";
import { rateLimit } from "./helpers/chat/rateLimit";

import { GameState } from "./types";

const messageCounts = new Map<
  string,
  { count: number; timer: NodeJS.Timeout }
>();
const lobbies: Record<string, GameState> = {};

export const handleIoEvents = (httpServer: http.Server) => {
  try {
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
      socket.on("joinLobby", async ({ lobbyId, playerId }) =>
        handleJoinLobby(socket, lobbyId, playerId, io)
      );

      socket.on("chat message", ({ msg, lobbyId }) => {
        if (rateLimit(socket, messageCounts)) return;

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
        messageCounts.delete(socket.id);
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
