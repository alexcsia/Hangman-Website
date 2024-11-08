import updateLobbyStatus from "../../helpers/updateLobbyStatus.ts";
import { Server } from "socket.io";

export const handleQuit = (
  socket: any,
  lobbyId: string,
  playerId: string,
  io: Server,
  lobbies: Record<string, any>
) => {
  console.log(`User ${playerId} is quitting lobby ${lobbyId}`);

  updateLobbyStatus(lobbyId);

  io.to(lobbyId).emit("matchQuit");
};
