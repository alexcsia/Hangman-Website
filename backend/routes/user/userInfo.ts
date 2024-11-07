import express from "express";
import { getUserInfo } from "../../modules/user/controllers/userInfo.ts";
import { authenticateJWT } from "../middleware/authenticateJWT.ts";

const router = express.Router();

router.get("/userInfo", authenticateJWT, getUserInfo);
export default router;
