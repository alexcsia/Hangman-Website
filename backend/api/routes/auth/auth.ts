import express from "express";
import {
  userLogout,
  authenticateUser,
  getNewAccessToken,
} from "../../../modules/user/controllers/auth/index";
import { authenticateJWT } from "../../middleware/authenticateJWT";

const router = express.Router();

router.post("/login", authenticateUser);
router.get("/logout", authenticateJWT, userLogout);
router.get("/refresh", getNewAccessToken);

export default router;
