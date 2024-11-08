import { Response, Request } from "express";
import { loginUser } from "../../services/userAuthentication.ts";
import { setAuthCookies } from "../utils/cookies/setAuthCookies.ts";

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const tokens = await loginUser(email, password);
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
