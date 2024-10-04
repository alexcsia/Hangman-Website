import { Request, Response } from "express";
import { addUser } from "../services/userRegistration.ts";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    await addUser(userData);
    return res.status(201).json("User registered successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error registering user:", error.message);
      return res.status(500).json({ message: error.message });
    }
  }
};
