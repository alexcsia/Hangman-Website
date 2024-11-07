import express from "express";
import {
  userLogout,
  authenticateUser,
  getNewAccessToken,
} from "../../modules/user/controllers/auth/index.ts";

// import { userLogout } from "../../modules/user/controllers/auth/userLogout.ts";
// import { getNewAccessToken } from "../../modules/user/controllers/auth/getNewAccessToken.ts";
// import { authenticateUser } from "../../modules/user/controllers/auth/authenticateUser.ts";
import { authenticateJWT } from "../middleware/authenticateJWT.ts";

const router = express.Router();

router.post("/login", authenticateUser);
router.get("/logout", authenticateJWT, userLogout);
router.get("/refresh", getNewAccessToken);

export default router;
