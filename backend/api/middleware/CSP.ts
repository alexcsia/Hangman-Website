import { Request, Response, NextFunction } from "express";

export const implementCSP = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval';"
  );

  next();
};
