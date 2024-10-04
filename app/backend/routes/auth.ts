import express from "express";
import { authenticateUser } from "../controllers/auth.ts";
const router = express.Router();

router.post("/login", authenticateUser);

export default router;
