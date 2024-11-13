import { Lobby } from "../../../models/Lobby";
import { ApiError } from "../../../../errors/ApiError";

export const searchForLobby = async (code: string) => {
  try {
    const lobby = await Lobby.findOne({ code: code, status: "ongoing" });
    return lobby;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new ApiError(404, "Lobby not found");
    }

    throw new ApiError(500, "An error occurred while searching for the lobby");
  }
};
