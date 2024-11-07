import express from "express";
import authRoutes from "./user/auth.ts";
import registerRoutes from "./user/register.ts";
import userRoutes from "./user/user.ts";
import playRoutes from "./lobby/play.ts";
import userInfo from "./user/userInfo.ts";

export const applyRoutes = (server: express.Application, handle: Function) => {
  server.use("/api/auth", authRoutes);
  server.use("/api/registration", registerRoutes);
  server.use("/api/users", userRoutes);
  server.use("/api/play", playRoutes);
  server.use("/api", userInfo);

  server.all("*", (req, res) => {
    return handle(req, res);
  });
};
