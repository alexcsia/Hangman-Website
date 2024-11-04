import express from "express";
import { getUserInfo } from "../../modules/user/controllers/userInfo.ts";
import { authenticateJWT } from "../../loaders/middleware/authenticateJWT.ts";

const router = express.Router();

router.get("/user/userInfo", authenticateJWT, getUserInfo);
export default router;
