import { GameState } from "../../types";

export const emitGameUpdate = (
  socket: any,
  lobbyId: string,
  playerId: string,
  lobbies: Record<string, GameState>
) => {
  const lobby = lobbies[lobbyId];
  const playerState = lobby?.players[playerId];

  socket.emit("gameUpdate", {
    word: lobby?.word,
    wordLength: lobby?.word.length,
    playerState: playerState,
  });
};
