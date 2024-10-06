import express from "express";
import next from "next";
import authRoutes from "./routes/auth.ts";
import registerRoutes from "./routes/register.ts";
import userRoutes from "./routes/user.ts";
import playRoutes from "./routes/play.ts";
import connectMongoDB from "./database.ts";
import http from "http";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

const startServer = async (): Promise<http.Server> => {
  await app.prepare();
  server.use(express.json());
  server.use("/api/auth", authRoutes);
  server.use("/api/registration", registerRoutes);
  server.use("/api/users", userRoutes);
  server.use("/api/play", playRoutes);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  await connectMongoDB();

  return new Promise((resolve) => {
    const httpServer = server.listen(process.env.PORT, () => {
      console.log("Ready on http://localhost:3000");
      if (process.env.NODE_ENV === "development") {
        console.log("Running in development mode");
      } else if (process.env.NODE_ENV === "production") {
        console.log("Running in production mode");
      }
      resolve(httpServer);
    });
  });
};

export { startServer };
