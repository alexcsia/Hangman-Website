import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

interface IJwtPayload {
  id: string;
  email: string;
}

//adding optional user property
export interface IAuthenticatedRequest extends Request {
  user?: IJwtPayload;
}

export const authenticateJWT = (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Please log in to continue" });
  }

  try {
    const verifiedToken = jwt.verify(token, JWT_SECRET);
    if (!isJwtPayloadWithUserData(verifiedToken)) {
      throw new Error("Invalid token payload");
    }

    req.user = { id: verifiedToken.id, email: verifiedToken.email };
    next();
  } catch (error: unknown) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log(error.message);
      return res
        .status(401)
        .json({ message: "Your session expired. Please log in again" });
    } else if (error instanceof Error) {
      console.log(error.message);
      return res
        .status(403)
        .json({ message: "Authentication failed. Please log in again" });
    }
  }
};

// type guard to ensure the token has 'id' and 'email'
function isJwtPayloadWithUserData(
  verifiedToken: unknown
): verifiedToken is { id: string; email: string } {
  return (
    typeof verifiedToken === "object" &&
    verifiedToken != null &&
    "id" in verifiedToken &&
    "email" in verifiedToken
  );
}
