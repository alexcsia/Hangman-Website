import { Request, Response, NextFunction } from "express";

export interface IJwtPayload {
  id: string;
  email: string;
  username: string;
}

export interface IAuthenticatedRequest extends Request {
  user?: IJwtPayload;
}
