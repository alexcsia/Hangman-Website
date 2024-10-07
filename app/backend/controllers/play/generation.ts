import { Request, Response } from "express";
import { createLobby } from "../../services/createLobby.ts";

export const generateCode = async (req: Request, res: Response) => {
  try {
    const lobby = await createLobby();
    return res.status(200).json({ lobby });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error authenticating user:", error.message);
      return res.status(500).json({ message: error.message });
    }
  }
};
