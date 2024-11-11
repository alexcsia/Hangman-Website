"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("../../../modules/user/controllers/user");
var authenticateJWT_1 = require("../../middleware/authenticateJWT");
var router = express_1.default.Router();
router.get("/user/:userId", authenticateJWT_1.authenticateJWT, user_1.getUserProfile);
exports.default = router;
