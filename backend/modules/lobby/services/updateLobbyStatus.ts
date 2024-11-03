import { Lobby } from "../../models/Lobby.ts";

const updateLobbyStatus = async (lobbyId: string) => {
  const lobby = await Lobby.findById(lobbyId);

  if (lobby) {
    lobby.status = "ended";
    await lobby.save();
  }
};

export default updateLobbyStatus;
