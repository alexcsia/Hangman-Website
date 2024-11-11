import express from "express";
import { getUserInfo } from "../../../modules/user/controllers/userInfo";
import { authenticateJWT } from "../../middleware/authenticateJWT";

const router = express.Router();

router.get("/userInfo", authenticateJWT, getUserInfo);
export default router;
