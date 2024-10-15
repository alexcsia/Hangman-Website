import express from "express";
import { userProfile } from "../../modules/user/controllers/user.ts";
import { authenticateJWT } from "../../loaders/middleware/authenticateJWT.ts";

const router = express.Router();

router.get("/user/:userId", authenticateJWT, userProfile);
console.log("hi");

export default router;
