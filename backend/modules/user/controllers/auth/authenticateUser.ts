import { Response, Request } from "express";
import userAuthentication from "../../services/userAuthentication.ts";
import { setAuthCookies } from "../utils/cookies/setAuthCookies.ts";

/**
 * Controller function to authenticate a user with their email and password.
 *
 * This function handles the login process by verifying the provided email and password
 * If the credentials are valid, it generates authentication tokens and sets them as cookies
 * Upon a successful login, a success message is sent to the client
 * If authentication fails, an error message is returned
 *
 * @param req - The incoming request object containing the user's email and password in the body.
 * @param res - The response object used to send the result to the client.
 * @returns A JSON response with a success message or an error message if authentication fails.
 */

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const tokens = await userAuthentication.loginUser(email, password);
    if (tokens) {
      setAuthCookies(res, tokens);
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error authenticating user:", error.message);
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
  }
};
