import { Server } from "socket.io";
import { rematchCounts } from "../../types";
import { isRematchReady } from "../../helpers/game/handleRematchHelpers/isRematchReady";
import { registerRematchVote } from "../../helpers/game/handleRematchHelpers/registerRematchVote";
import { startNewGame } from "../../helpers/game/handleRematchHelpers/startNewGame";

export const handleRematch = async (
  socket: any,
  lobbyId: string,
  playerId: string,
  io: Server
) => {
  registerRematchVote(lobbyId, playerId);

  if (isRematchReady(lobbyId)) {
    await startNewGame(lobbyId, io, playerId);
    clearRematchVotes(lobbyId);
  }
};

const clearRematchVotes = (lobbyId: string) => {
  delete rematchCounts[lobbyId];
};
