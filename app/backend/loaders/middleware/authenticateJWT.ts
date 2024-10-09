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
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: "Access token missing or invalid" });
  }

  try {
    const verifiedToken = jwt.verify(token, JWT_SECRET);

    if (isJwtPayloadWithUserData(verifiedToken)) {
      req.user = { id: verifiedToken.id, email: verifiedToken.email };
      next();
    } else {
      return res.status(403).json({ message: "Invalid token payload" });
    }
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(403).json({ message: error.message });
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
