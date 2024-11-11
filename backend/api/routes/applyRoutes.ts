import express from "express";
import authRoutes from "./auth/auth";
import registerRoutes from "./registration/register";
import userRoutes from "./profile/user";
import playRoutes from "./play/play";
import userInfo from "./userInfo/userInfo";

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
