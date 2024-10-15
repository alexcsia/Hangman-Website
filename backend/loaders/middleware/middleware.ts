import express from "express";

export const setUpMiddleware = (server: express.Application) => {
  server.use(express.json());
};
