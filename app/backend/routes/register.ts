import express from "express";
import { registerUser } from "../controllers/register.ts";

const router = express.Router();

router.post("/register", registerUser);

export default router;
