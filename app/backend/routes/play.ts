import express from "express";
import { generateCode } from "../controllers/play/generation.ts";
import { searchLobby } from "../controllers/play/search.ts";

const router = express.Router();

router.get("/generate", generateCode);
router.post("/find", searchLobby);

export default router;
