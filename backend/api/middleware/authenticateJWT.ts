import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import isJwtPayloadWithUserData from "../../modules/user/utils/jwtUtils/isJWTPayload";
import { IAuthenticatedRequest } from "../../modules/types/IAuthenticatedRequest";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET not defined");

export const authenticateJWT = (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Could not find access token" });
  }

  try {
    const verifiedToken = jwt.verify(token, JWT_SECRET);
    if (!isJwtPayloadWithUserData(verifiedToken)) {
      throw new Error("Invalid token payload");
    }

    req.user = {
      id: verifiedToken.id,
      email: verifiedToken.email,
      username: verifiedToken.username,
    };
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
