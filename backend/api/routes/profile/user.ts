import express from "express";
import { getUserProfile } from "../../../modules/user/controllers/user";
import { authenticateJWT } from "../../middleware/authenticateJWT";

const router = express.Router();

router.get("/user/:userId", authenticateJWT, getUserProfile);

export default router;
