import express from "express";
import { registerUser } from "../../../modules/user/controllers/register";

const router = express.Router();

router.post("/register", registerUser);

export default router;
