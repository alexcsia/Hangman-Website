import express from "express";
import {
  authenticateUser,
  userLogout,
} from "../../modules/user/controllers/auth.ts";
import { authenticateJWT } from "../../../backend/loaders/middleware/authenticateJWT.ts";

const router = express.Router();

router.post("/login", authenticateUser);
router.get("/logout", authenticateJWT, userLogout);

export default router;
