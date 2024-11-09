import express from "express";
import authRoutes from "./auth/auth.ts";
import registerRoutes from "./registration/register.ts";
import userRoutes from "./profile/user.ts";
import playRoutes from "./play/play.ts";
import userInfo from "./userInfo/userInfo.ts";

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
