import { User } from "../../models/User.ts";
import { comparePasswords } from "../utils/passwordUtils/comparePassword.ts";
import { signAccessJWT, signRefreshJWT } from "../utils/jwtUtils/index.ts";
import { getUserByEmail } from "../utils/userQueries/getUserByEmail.ts";
import { verifyRefreshToken } from "../utils/jwtUtils/index.ts";

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    await comparePasswords(password, user);

    const accessToken = signAccessJWT(user);
    const refreshToken = signRefreshJWT(user);
    if (!accessToken || !refreshToken) {
      throw new Error("Failed to generate tokens");
    }

    return { accessToken, refreshToken };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
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
