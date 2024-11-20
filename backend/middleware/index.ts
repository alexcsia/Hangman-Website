import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "../api/middleware/errorHandler";
import { implementCSP } from "../api/middleware/CSP";

export const setUpMiddleware = (server: express.Application) => {
  server.use(express.json());
  server.use(implementCSP);
  server.use(cookieParser());
  server.use(errorHandler);
};
