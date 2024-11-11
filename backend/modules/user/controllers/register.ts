import { Request, Response } from "express";
import userRegistration from "../services/userRegistration";

/**
 * Controller function to register a new user
 *
 * This function receives user registration details (`username`, `email`, and `password`) from the request body
 * and attempts to create a new user in the database. If the user is successfully created, it returns a success
 * message with a 201 status code. If an error occurs, it logs the error and returns a 500
 * status with the error message
 *
 * @param req - The incoming request object, expected to contain `username`, `email`, and `password` in the body
 * @param res - The response object used to send the registration result
 * @returns A JSON response with a success message upon successful registration, or an error message if registration fails
 */

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    await userRegistration.addUser(username, email, password);
    return res.status(201).json("User registered successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error registering user:", error.message);
      return res.status(500).json({ message: error.message });
    }
  }
};
