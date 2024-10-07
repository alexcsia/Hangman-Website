import { Lobby } from "../../models/Lobby.ts";

export const createLobby = async () => {
  const lobby = await Lobby.create({
    players: "abcd",
    status: "",
    code: "abcdefgh",
  });

  return lobby;
};
