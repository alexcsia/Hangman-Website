import { Request, Response } from "express";
import { addUser } from "../services/userRegistration.ts";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../utils/validators/index.ts";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const validatedUsername = validateUsername(username);
    const validatedEmail = await validateEmail(email);
    const validatedPassword = validatePassword(password);

    await addUser(validatedUsername, validatedEmail, validatedPassword);
    return res.status(201).json("User registered successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error registering user:", error.message);
      return res.status(500).json({ message: error.message });
    }
  }
};
