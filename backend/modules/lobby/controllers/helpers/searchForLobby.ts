import { Lobby } from "../../../models/Lobby";

export const searchForLobby = async (code: string) => {
  try {
    const lobby = await Lobby.findOne({ code: code, status: "ongoing" });
    return lobby;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error("Lobby not found");
  }
};
