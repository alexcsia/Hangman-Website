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
    const decoded = jwt.verify(token, JWT_SECRET);

    if (isJwtPayloadWithUserData(decoded)) {
      req.user = { id: decoded.id, email: decoded.email };
      next();
    } else {
      return res.status(403).json({ message: "Invalid token payload" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error);
    return res
      .status(403)
      .json({ message: "Authorization failed. Please try logging in again." });
  }
};

// type guard to ensure decoded token has 'id' and 'email'
function isJwtPayloadWithUserData(
  decoded: unknown
): decoded is { id: string; email: string } {
  return (
    typeof decoded === "object" &&
    decoded != null &&
    "id" in decoded &&
    "email" in decoded
  );
}
