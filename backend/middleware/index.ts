import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "../api/middleware/errorHandler";

export const setUpMiddleware = (server: express.Application) => {
  server.use(express.json());
  server.use(cookieParser());
  server.use(errorHandler);
};
