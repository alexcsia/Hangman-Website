import { User } from "../../models/User";
import { signAccessJWT, signRefreshJWT } from "../utils/jwtUtils/index";
import { verifyRefreshToken } from "../utils/jwtUtils/index";
import { ApiError } from "../../../errors/ApiError";
import { validateUserCredentials } from "../utils/validators/index";
import { getUserFromToken } from "../utils/jwtUtils/index";

const loginUser = async (email: string, password: string) => {
  try {
    const user = await validateUserCredentials(email, password);

    const accessToken = signAccessJWT(user);
    const refreshToken = signRefreshJWT(user);
    if (!accessToken || !refreshToken) {
      throw new ApiError(500, "Failed to generate tokens");
    }

    return { accessToken, refreshToken };
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "An error occurred during login");
  }
};

const generateAccessToken = async (refreshToken: string) => {
  try {
    const verifiedToken = verifyRefreshToken(refreshToken);
    const user = await getUserFromToken(verifiedToken);

    return signAccessJWT(user);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "An error occurred during token generation");
  }
};

export default {
  loginUser,
  generateAccessToken,
};
