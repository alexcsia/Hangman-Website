import { User, IUser } from "../../models/User.ts";
import {
  signAccessJWT,
  signRefreshJWT,
  verifyRefreshToken,
} from "../utils/jwtUtils/index.ts";

export const loginUser = async (user: IUser) => {
  try {
    const accessToken = signAccessJWT(user);
    const refreshToken = signRefreshJWT(user);

    if (!accessToken || !refreshToken) {
      throw new Error("Failed to generate tokens");
    }
    return { accessToken: accessToken, refreshToken: refreshToken };
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const generateAccessToken = async (refreshToken: string) => {
  try {
    const verifiedToken = verifyRefreshToken(refreshToken);
    const userId = verifiedToken.id;

    const user = await User.findById(userId);
    if (!user) throw new Error("Could not find user");

    const accessToken = signAccessJWT(user);
    return accessToken;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
