import { Response, Request } from "express";
import { comparePasswords } from "../../utils/passwordUtils/comparePassword.ts";
import { getUserByEmail } from "../../utils/userQueries/getUserByEmail.ts";
import { setAuthCookies } from "../utils/cookies/setAuthCookies.ts";
import { loginUser } from "../../services/userAuthentication.ts";

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const user = await getUserByEmail(userData.email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    await comparePasswords(userData.password, user);

    const userTokens = await loginUser(user);
    if (userTokens) setAuthCookies(res, userTokens);

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
