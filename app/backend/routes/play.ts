import express from "express";
import { generateCodeAndLobby } from "../controllers/play/generation.ts";
import { searchLobby } from "../controllers/play/search.ts";
import { authenticateJWT } from "../loaders/middleware/authenticateJWT.ts";
const router = express.Router();

router.get("/generate", authenticateJWT, generateCodeAndLobby);
router.post("/find", searchLobby);

export default router;
