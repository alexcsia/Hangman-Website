import { Lobby } from "../../../modules/models/Lobby";

const updateLobbyStatus = async (lobbyId: string) => {
  const lobby = await Lobby.findById(lobbyId);

  if (lobby) {
    lobby.status = "ended";
    await lobby.save();
  }
};

export default updateLobbyStatus;
