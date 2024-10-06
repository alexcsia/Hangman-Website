import { Request, Response } from "express";

export const generateCode = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: "found generate" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error authenticating user:", error.message);
      return res.status(500).json({});
    }
  }
};
