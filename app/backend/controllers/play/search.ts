import { Request, Response } from "express";

export const searchLobby = async (req: Request, res: Response) => {
  try {
    const data = await req.body;
    return res.status(200).json({ data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error authenticating user:", error.message);
      return res.status(500).json({ message: error.message });
    }
  }
};
