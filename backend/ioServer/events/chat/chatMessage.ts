import { Server } from "socket.io";

export const handleChatMessage = (
  socket: any,
  msg: string,
  lobbyId: string,
  io: Server
) => {
  io.to(lobbyId).emit("chat message", { msg });
};
