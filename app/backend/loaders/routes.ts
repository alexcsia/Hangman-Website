import express from "express";
import authRoutes from "../routes/auth.ts";
import registerRoutes from "../routes/register.ts";
import userRoutes from "../routes/user.ts";
import playRoutes from "../routes/play.ts";

export const applyRoutes = (server: express.Application, handle: Function) => {
  server.use("/api/auth", authRoutes);
  server.use("/api/registration", registerRoutes);
  server.use("/api/users", userRoutes);
  server.use("/api/play", playRoutes);

  server.all("*", (req, res) => {
    return handle(req, res);
  });
};
