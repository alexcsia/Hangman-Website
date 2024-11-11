"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userInfo_1 = require("../../../modules/user/controllers/userInfo");
var authenticateJWT_1 = require("../../middleware/authenticateJWT");
var router = express_1.default.Router();
router.get("/userInfo", authenticateJWT_1.authenticateJWT, userInfo_1.getUserInfo);
exports.default = router;
