import { Request, Response } from "express";
import { clearCookie } from "../utils/cookies/clearAuthCookies";
import { ApiError } from "../../../../errors/ApiError";

/**
 * Controller function to log out a user by clearing their authentication cookies
 *
 * This function removes the `accessToken` and `refreshToken` cookies from the user's session, therefore
 * logging them out of the application. If successful, it returns a success message. If an error occurs
 * during the process, it logs the error and returns an internal server error response
 *
 * @param req - The incoming request object
 * @param res - The response object used to clear cookies and send a response
 * @returns A JSON response with a success message upon successful logout or an error message if logging out fails
 */

export const userLogout = async (req: Request, res: Response) => {
  try {
    clearCookie(res, "accessToken");
    clearCookie(res, "refreshToken");

    return res.status(200).json({ message: "Logout successful" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error logging out:", error.message);
      throw new ApiError(500, "Internal server error");
    }

    throw new ApiError(500, "Internal server error");
  }
};
