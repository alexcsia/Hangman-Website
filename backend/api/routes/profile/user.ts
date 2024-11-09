import express from "express";
import { getUserProfile } from "../../../modules/user/controllers/user.ts";
import { authenticateJWT } from "../../middleware/authenticateJWT.ts";

const router = express.Router();

router.get("/user/:userId", authenticateJWT, getUserProfile);

export default router;
