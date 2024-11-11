import express from "express";
import { generateCodeAndLobby } from "../../../modules/lobby/controllers/generation";
import { joinLobby } from "../../../modules/lobby/controllers/join";
import { authenticateJWT } from "../../middleware/authenticateJWT";
const router = express.Router();

router.get("/generate", authenticateJWT, generateCodeAndLobby);
router.post("/find", authenticateJWT, joinLobby);

export default router;
