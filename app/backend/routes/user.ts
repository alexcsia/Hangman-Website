import express from "express";
import { userProfile } from "../controllers/user.ts";
import { authenticateJWT } from "../middleware/authenticateJWT.ts";

const router = express.Router();

router.get("/user/:userId", authenticateJWT, userProfile);

export default router;
