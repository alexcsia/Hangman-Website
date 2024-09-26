import { Request, Response } from "express";
import { addUser } from "../services/userRegistration.ts";
import { loginUser } from "../services/userAuthentication.ts";

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

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const token = await loginUser(userData.password, userData.email);
    console.log(token);
    return res.status(200).json({ token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error registering user:", error.message);
      return res.status(500).json({ message: error.message });
    }
  }
};
