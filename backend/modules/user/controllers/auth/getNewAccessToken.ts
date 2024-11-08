import { Response, Request } from "express";
import { generateAccessToken } from "../../services/userAuthentication.ts";
import { setAccessTokenCookie } from "../utils/cookies/accessJWTCookie.ts";

export const getNewAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const newAccessToken = await generateAccessToken(refreshToken);
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
