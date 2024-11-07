import express from "express";
import next from "next";
import http from "http";
import { applyRoutes } from "./routes/routes.ts";
import { setUpMiddleware } from "./middleware/middleware.ts";
import connectMongoDB from "./loaders/database.ts";
import { handleIoEvents } from "./ioServer/ioServer.ts";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

const startServer = async (): Promise<http.Server> => {
  await app.prepare();

  setUpMiddleware(server);
  applyRoutes(server, handle);

  await connectMongoDB();

  const httpServer = http.createServer(server);

  handleIoEvents(httpServer);

  return new Promise((resolve) => {
    httpServer.listen(process.env.PORT, () => {
      console.log(`Ready on http://localhost:${process.env.PORT}`);
      resolve(httpServer);
    });
  });
};

export { startServer };
