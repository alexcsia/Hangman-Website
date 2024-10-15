import express from "express";
import { authenticateUser } from "../../modules/user/controllers/auth.ts";
const router = express.Router();

router.post("/login", authenticateUser);

export default router;
