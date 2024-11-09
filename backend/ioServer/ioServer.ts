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

const MESSAGE_LIMIT = 5;
const TIME_WINDOW = 5000;

const messageCounts = new Map<
  string,
  { count: number; timer: NodeJS.Timeout }
>();

export const handleIoEvents = (httpServer: http.Server) => {
  try {
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
      socket.on("joinLobby", async ({ lobbyId, playerId }) =>
        handleJoinLobby(socket, lobbyId, playerId, io)
      );

      // rate limiting
      socket.on("chat message", ({ msg, lobbyId }) => {
        const socketId = socket.id;

        if (!messageCounts.has(socketId)) {
          messageCounts.set(socketId, {
            count: 1,
            timer: setTimeout(
              () => messageCounts.delete(socketId),
              TIME_WINDOW
            ),
          });
        } else {
          const userData = messageCounts.get(socketId)!;
          userData.count += 1;

          if (userData.count > MESSAGE_LIMIT) {
            socket.emit("rate error", "Rate limit exceeded, please wait.");
            return;
          }
        }

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
