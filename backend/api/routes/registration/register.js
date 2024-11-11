"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var register_1 = require("../../../modules/user/controllers/register");
var router = express_1.default.Router();
router.post("/register", register_1.registerUser);
exports.default = router;
