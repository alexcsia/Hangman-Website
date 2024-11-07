import { Response } from "express";
import { setRefreshTokenCookie } from "./refreshJWTCookie.ts";
import { setAccessTokenCookie } from "./accessJWTCookie.ts";

interface UserTokens {
  accessToken: string;
  refreshToken: string;
}

export const setAuthCookies = (res: Response, userTokens: UserTokens): void => {
  if (!userTokens || !userTokens.accessToken || !userTokens.refreshToken) {
    throw new Error("Missing access token or refresh token");
  }

  setAccessTokenCookie(res, userTokens.accessToken);
  setRefreshTokenCookie(res, userTokens.refreshToken);
};
