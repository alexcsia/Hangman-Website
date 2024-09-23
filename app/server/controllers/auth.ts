import { Request, Response } from "express";
import { addUser } from "../services/userRegistration.ts";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await addUser(userData);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error registering user" });
  }
};
