import { Response, Request } from "express";
import userAuthentication from "../../services/userAuthentication.ts";
import { setAccessTokenCookie } from "../utils/cookies/accessJWTCookie.ts";

/**
 * Controller function to refresh a user's access token by using their refresh token
 *
 * This function checks for a valid refresh token in the user's cookies. If found, it attempts to
 * generate a new access token. The new access token is set as an HTTP-only cookie
 * and a success message is sent to the client. If the refresh token is missing/invalid, or if
 * token generation fails, an error message is returned
 *
 * @param req - The incoming request object, expected to contain a refresh token in the cookies
 * @param res - The response object used to send the new access token or an error message
 * @returns A JSON response with a success message and the updated access token cookie, or an error status
 */

export const getNewAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const newAccessToken = await userAuthentication.generateAccessToken(
      refreshToken
    );
    if (newAccessToken) {
      setAccessTokenCookie(res, newAccessToken);
    }

    return res
      .status(200)
      .json({ message: "Access token refreshed successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error generating new access token:", error.message);
      return res.status(403).json({
        message: "Failed to generate access token",
      });
    }
  }
};
