export const joinLobby = (socket: any, lobbyId: string, playerId: string) => {
  socket.join(lobbyId);
  console.log(`Player ${playerId} joined lobby: ${lobbyId}`);
};
