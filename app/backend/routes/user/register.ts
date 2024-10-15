import express from "express";
import { registerUser } from "../../modules/user/controllers/register.ts";

const router = express.Router();

router.post("/register", registerUser);

export default router;
