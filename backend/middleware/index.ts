import express from "express";
import cookieParser from "cookie-parser";

export const setUpMiddleware = (server: express.Application) => {
  server.use(express.json());
  server.use(cookieParser());
};
