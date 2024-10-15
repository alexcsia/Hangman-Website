import express from "express";
import authRoutes from "../routes/user/auth.ts";
import registerRoutes from "../routes/user/register.ts";
import userRoutes from "../routes/user/user.ts";
import playRoutes from "../routes/lobby/play.ts";

export const applyRoutes = (server: express.Application, handle: Function) => {
  server.use("/api/auth", authRoutes);
  server.use("/api/registration", registerRoutes);
  server.use("/api/users", userRoutes);
  server.use("/api/play", playRoutes);

  server.all("*", (req, res) => {
    return handle(req, res);
  });
};
