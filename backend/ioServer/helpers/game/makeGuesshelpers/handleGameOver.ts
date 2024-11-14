import { Server } from "socket.io";
import addWinToUser from "../addWinToUser";

export const handleGameOver = (
  io: Server,
  lobbyId: string,
  message: string,
  playerId?: string
) => {
  io.to(lobbyId).emit("gameOver", message);
  if (playerId) {
    addWinToUser(playerId).catch(console.log);
  }
};
