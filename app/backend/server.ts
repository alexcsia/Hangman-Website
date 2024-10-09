import express from "express";
import next from "next";
import http from "http";
import { applyRoutes } from "./loaders/routes.ts";
import { setUpMiddleware } from "./loaders/middleware/middleware.ts";
import connectMongoDB from "./loaders/database.ts";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

const startServer = async (): Promise<http.Server> => {
  await app.prepare();

  setUpMiddleware(server);
  applyRoutes(server, handle);

  await connectMongoDB();

  return new Promise((resolve) => {
    const httpServer = server.listen(process.env.PORT, () => {
      console.log(`Ready on http://localhost:${process.env.PORT}`);
      resolve(httpServer);
    });
  });
};

export { startServer };
