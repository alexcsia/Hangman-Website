import express from "express";
import { generateCodeAndLobby } from "../../../modules/lobby/controllers/generation.ts";
import { joinLobby } from "../../../modules/lobby/controllers/join.ts";
import { authenticateJWT } from "../../middleware/authenticateJWT.ts";
const router = express.Router();

router.get("/generate", authenticateJWT, generateCodeAndLobby);
router.post("/find", authenticateJWT, joinLobby);

export default router;
