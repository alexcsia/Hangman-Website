import express from "express";
import { generateCodeAndLobby } from "../../modules/lobby/controllers/generation.ts";
import { searchLobby } from "../../modules/lobby/controllers/search.ts";
import { authenticateJWT } from "../../loaders/middleware/authenticateJWT.ts";
const router = express.Router();

router.get("/generate", authenticateJWT, generateCodeAndLobby);
router.post("/find", authenticateJWT, searchLobby);

export default router;
