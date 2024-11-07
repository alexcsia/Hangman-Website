import { nanoid } from "nanoid";
import { Lobby } from "../../../models/Lobby";

export const generateInviteCode = async (): Promise<string> => {
  const newCode = nanoid(8);
  const existingCode = await Lobby.findOne({
    status: "ongoing",
    code: newCode,
  });

  if (!existingCode) return newCode;
  return generateInviteCode();
};
